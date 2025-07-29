const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./Config/DB_Connect")
const userRoute = require("./Routes/userRoute")

const upload = require("./Config/multerConfig");
const path = require("path");





const app = express();
// express.json();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// database connection 
dbConnect();

//routes 

app.use("/api/user", userRoute)

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads", express.static("public/uploads"));




app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
