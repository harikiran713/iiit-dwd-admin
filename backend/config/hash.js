const bcrypt = require('bcryptjs');

function generateHashedPassword(password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

// Example usage
const hashed1 = generateHashedPassword('admin123');
const hashed2 = generateHashedPassword('secure456');

console.log('Hashed admin123:', hashed1);
console.log('Hashed secure456:', hashed2);
