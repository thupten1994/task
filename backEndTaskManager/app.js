require("dotenv").config()


  
const express = require("express")
const router = require("./Router/task")
const user = require("./Router/user")
const mongoose = require("mongoose")
const app = express()

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGOZ_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error("Failed to connect to MongoDB:", e.message);
  });


app.use(express.json())
app.use("/task",router)
app.use("/user",user)

