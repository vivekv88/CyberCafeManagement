document.getElementById('settings-menu').addEventListener('change', function () {
    const selectedValue = this.value;
    if (selectedValue !== "S") {
        window.location.href = selectedValue; // Navigate to the selected page
    }
});