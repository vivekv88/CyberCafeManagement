import User from "../models/user-account.js";
import Session from "../models/userSession.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Create a new session with startTime
    const newSession = new Session({
      userId: user._id,
      startTime: Date.now(), // automatically set by schema too
      paymentStatus: "unpaid"
    });

    await newSession.save();

    // 4. Create JWT token for authentication (optional)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful, session started",
      token,
      sessionId: newSession._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const registerUser = async (req, res) => {

    const { name, email, password, mobile } = req.body;

    try {

        const userexists = await User.findOne({ email });

        if (userexists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUserAccount = new User({
            name: name,
            email: email,
            password: hashedPassword,
            mobile: mobile
        })

        const newUser = await newUserAccount.save();
        const token = createToken(newUser._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error.message);
        return res.json({success:false,message:"Some error Occurred"})
    }
}

const userLogout =  async (req, res) => {
  try {
    const { sessionId } = req.body;

    let session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ success: false, message: "Session not found" });

    // set endTime
    session.endTime = new Date();

    // calculate duration (in minutes)
    const duration = Math.ceil((session.endTime - session.startTime) / (1000 * 60));
    session.duration = duration;

    // calculate bill (e.g. ₹2 per minute)
    const ratePerMinute = 2;
    session.billAmount = duration * ratePerMinute;

    await session.save();

    // create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Cyber Cafe Usage" },
            unit_amount: session.billAmount * 100, // Stripe uses paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5174/success?sessionId=" + session._id,
      cancel_url: "http://localhost:5174/cancel",
    });

    res.json({
      success: true,
      message: "Bill generated",
      sessionId: session._id,
      billAmount: session.billAmount,
      paymentUrl: stripeSession.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Webhook: Stripe → Update payment status
router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, "YOUR_STRIPE_WEBHOOK_SECRET");

    if (event.type === "checkout.session.completed") {
      const stripeSession = event.data.object;
      const sessionId = stripeSession.success_url.split("sessionId=")[1];

      await Session.findByIdAndUpdate(sessionId, { paymentStatus: "paid" });
      console.log("✅ Payment marked as paid for session:", sessionId);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});


export { loginUser, registerUser}