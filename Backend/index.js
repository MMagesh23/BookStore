const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["https://book-store-seven-kappa.vercel.app/"],
             methods:["POST","GET","PUT","DELETE"],
              credentials:true
             }));

app.use("/", authRoutes);
app.use("/", bookRoutes);
app.use("/", orderRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected and Listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
