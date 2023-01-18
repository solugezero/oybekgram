const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log(req.body);
        console.log(`Пользователь ${username} не найден`);
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        console.log("Введён неверный пароль");
        return res.status(400).json({ message: "Введён неверный пароль" });
      }
      const token = generateAccessToken(user._id, user.username);
      console.log(token);
      return res.json({ token: token, user: user });
    } catch (e) {
      console.log(e);
      console.log("Login error");
      res.status(400).json({ message: "Login error" });
    }
  }

  async register(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username: username });
      if (candidate) {
        console.log(`Пользователь ${username} уже существует.`);
        return res
          .status(400)
          .json({ message: `Пользователь ${username} уже существует.` });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const newUser = new User({
        username: username,
        password: hashPassword,
      });
      await newUser.save();
      console.log("Пользователь зарегестрирован");
      return res.status(200).json({ message: "Пользователь зарегестрирован" });
    } catch (e) {
      console.log(e);
      console.log("Register error");
      res.status(400).json({ message: "Register error" });
    }
  }
}

module.exports = new authController();
