const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { name, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ name, role, password: hashPassword });
    const token = generateJwt(user.id, user.name, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });
    if (!name && !password) {
      return next(res.json({ message: "Поля обязательны для заполнения" }));
    }
    if (!user) {
      return next(res.json({ message: "Пользователь не найден" }));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(res.json({ message: "Указан неверный пароль" }));
    }
    const token = generateJwt(user.id, user.name, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name);
    return res.json({ token });
  }
}

module.exports = new UserController();
