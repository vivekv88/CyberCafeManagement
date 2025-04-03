const express = require('express');
const app = express();
const path = require('path');
// const fs = require('fs');
const mysql = require('mysql2');
// const router = express.Router();
const session = require('express-session');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

app.set('view engine',"ejs");
// app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public' )));

app.get('/',(req,res) => {
    res.render("index" ,{error: '* Invalid username or password'});
})

app.use(
    session({
        secret: 'my-secret-key', // Replace with a secure random string in production
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set secure: true if using HTTPS
    })
);

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});




app.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    // Check if the username already exists
    const checkQuery = 'SELECT * FROM admins WHERE username = ?';
    connection.query(checkQuery, [username], async (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            console.log("Username already exists.");
            return res.send('Username already exists. Please choose another.');
        }

        

        // Insert new admin into the database
        const insertQuery = 'INSERT INTO admins (username, password) VALUES (?, ?)';
        connection.query(insertQuery, [username, hashedpassword], (err, result) => {
            if (err) {
                console.error('Error inserting admin:', err);
                return res.status(500).send('Internal Server Error');
            }

            console.log("Admin registered successfully:", result);
            res.redirect('/login'); // Redirect to login page after successful registration
        });
    });
});








// Login Route (Compare Password)
app.post('/admin/loggin', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    // Retrieve the admin from the database
    const query = 'SELECT * FROM admins WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error fetching data from database:', err);
        return res.status(500).send('Failed to fetch user data');
      }
  
      if (results.length === 0) {
        return res.status(400).send('Invalid username or password');
      }
  
      for (const admin of results) {
        // Compare password with the stored hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
          // If a match is found, log in the admin and send success response
          return res.redirect('/adminpage');
        } else{

            res.render('/login',{ error: '* Invalid username or password'});

        }
  
      }
    });
  });
  


// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


app.get('/changepassword',(req,res) => {
    res.render('changepassword')
})


app.post('/admin/changepassword', async (req, res) => {
    const { username, currentPassword, newPassword, confirmPassword } = req.body;

    try {
        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).send('New passwords do not match.');
        }

        // Fetch the admin record from the database based on the username
        const [rows] = await promisePool.query('SELECT * FROM admins WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).send('User not found.');
        }

        const admin = rows[0];
        console.log(admin)

        // Compare the current password using bcrypt
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).send('Current password is incorrect.');
        }

        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await promisePool.query('UPDATE admins SET password = ? WHERE username = ?', [hashedNewPassword, username]);

        res.send('Password updated successfully.');
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).send('Server error.');
    }
});



app.get('/dashboard',(req,res) => {
    res.render('dashboard')
})

app.get('/addcustomer',(req,res) => {
    res.render("addcustomer")
})


app.post('/addcustomer', async (req, res) => {
    const {name,contact} = req.body; // Get data from the request body

    if ( !name || !contact) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // SQL query to insert data into the "users" table
        const query = 'INSERT INTO customers (name,contact) VALUES (?,?)';
        const [result] = await promisePool.execute(query, [  ,name,contact]);

        res.redirect('/users?success=User added successfully');
    } catch (err) {
        console.error('Error adding user:', err.message);
        res.redirect('/users?error=Error adding user');
    }
});


app.get('/removecustomer',(req,res) => {
    res.render('removecustomer')
})

app.get('/addcomputer',(req,res) => {
    res.render('addcomputer')
})

app.post('/addcomputer', async (req, res) => {
    const {name} = req.body; // Get data from the request body

    if ( !name ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // SQL query to insert data into the "users" table
        const query = 'INSERT INTO computers (name) VALUES (?)';
        const [result] = await promisePool.execute(query, [,name]);

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Computer added successfully' });
        } else {
            res.status(500).json({ message: 'Failed to add Computer' });
        }
    } catch (err) {
        console.error('Error adding Computer:', err.message);
        res.status(500).json({ message: 'Error inserting data into the database' });
    }
});

app.get('/adminpage',(req,res) => {
    res.render("adminpage")
})

app.post('/adminpage',(req,res) => {
    res.render("adminpage")
})

app.post('/dashboard',(req,res) => {
    res.render("dashboard")
})

app.get('/about',(req,res) => {
    res.render("about")
})

app.get('/contact',(req,res) => {
    res.render("contact")
})

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Insert the message into the database
        await connection.execute(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        // Redirect to a "Thank You" page or back to the contact form
        res.redirect('/contact?success=true');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/admin/messages', async (req, res) => {
    try {
        const [messages] = await promisePool.execute('SELECT * FROM messages');

        if (!messages || messages.length === 0) {
            return res.render('admin-messages', { messages: [] });
        }

        res.render('admin-messages', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/services',(req,res) => {
    res.render("services")
})



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vivek@8874', // Add your MySQL password
    database: 'CyberCafeManagement',
    port:3306
});

 
const promisePool = connection.promise();

// Route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const [users] = await promisePool.query('SELECT * FROM customers'); // Replace 'users' with your actual table name
        res.render('users', { users });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).send('Failed to fetch users');
    }
});

app.post('/users/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL parameter
        const query = 'DELETE FROM customers WHERE id = ?';

        await promisePool.query(query, [userId]);

        

        res.redirect('/users'); // Redirect back to the users table
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send('Error deleting user');
    }
});



// Route to fetch all computers
app.get('/computers', async (req, res) => {
    try {
        const [computers] = await promisePool.query('SELECT * FROM computers'); // Replace 'computers' with your actual table name
        res.render('computers', { computers });
    } catch (err) {
        console.error('Error fetching computers:', err.message);
        res.status(500).send('Failed to fetch computers');
    }
});

app.post('/computers/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL parameter
        const query = 'DELETE FROM computers WHERE id = ?';

        await promisePool.query(query, [userId]);
/*
        await promisePool.query('SET @new_id = 100;');
        await promisePool.query('UPDATE computers SET id = (@new_id := @new_id + 1);');
        await promisePool.query('ALTER TABLE computers AUTO_INCREMENT = 1;');
*/     

        res.redirect('/computers'); // Redirect back to the users table
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send('Error deleting user');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

