const bcrypt = require("bcryptjs");

async function hashPassword() {
  const hashed = await bcrypt.hash("12345678", 10);
  console.log(hashed);
}

hashPassword();