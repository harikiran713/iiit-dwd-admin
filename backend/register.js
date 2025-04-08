const connectDB = require('./config/db'); // your db connection
const registerAdmin = require('./services/adminService');


const run = async () => {
    await connectDB();
    await registerAdmin("admin3@college.edu", "secure789");
    process.exit();
};

run();
