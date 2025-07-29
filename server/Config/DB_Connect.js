const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("database connection failed with error : ", err);
    process.exit(1);
  }
};

module.exports = dbConnect;
