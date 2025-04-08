const bcrypt = require('bcryptjs');

// Pre-hashed passwords (generate these once and store)
// To generate: bcrypt.hashSync('yourpassword', 10)
const admins = [
    {
        email: "admin1@college.edu",
        password: "$2a$10$N9qo8uLOickgx2ZMRZoMy.Mr6sfYZ7J8q0q3jR6F5.2Tj7O0lFqK2" // hashed "admin123"
    },
    {
        email: "admin2@college.edu",
        password: "$2a$10$WXW.5v5z8Y9X5U9r8nZJ4uYQ1V9x8XZ5X9r8nZJ4uYQ1V9x8XZ5X9" // hashed "secure456"
    }
];

module.exports = admins;