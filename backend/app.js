const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5564;
const app = express();
const authRoutes = require("./routes/authRoutes")
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// app.get('/',(req, res) => {

// });

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERaPASSWORD}@cluster0.27m5ahe.mongodb.net/news-management`
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(`MongoDB failed to connect: ${error}`));

app.use("/api", authRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
