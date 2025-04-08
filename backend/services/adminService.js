// services/adminService.js
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function registerAdmin(email, plainPassword) {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        console.log("Admin already exists!");
        return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new Admin({
        email,
        password: hashedPassword,
    });

    await newAdmin.save();
    console.log("Admin registered successfully:", newAdmin);
}

module.exports = registerAdmin;
