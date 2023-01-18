const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const postRouter = require("./routes/postRouter");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ debug: true, createParentPath: true }));

app.use("/auth", authRouter);
app.use("/", profileRouter);
app.use("/posts", postRouter);

const startServer = () => {
  try {
    app.listen(PORT, () => console.log(`Backend started at PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

const startDataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.8qldfwi.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Connected to MongoDB");
      }
    );
  } catch (e) {
    console.log(e);
  }
};

startServer();
startDataBase();
