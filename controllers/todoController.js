const { Todo } = require("../models/models");

class TodoController {
  async createOrUpdate(req, res, next) {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    try {
      const { username, useremail, todotext, id, isComplete } = req.body;

      if (id) {
        const findTodo = await Todo.findOne({ where: { id: id } });
        if (findTodo.todotext !== todotext) {
          findTodo.isChanged = true;
        }

        findTodo.todotext = todotext;
        findTodo.isComplete = isComplete;

        await findTodo.save();
        return res.json(findTodo);
      } else {
        if (!username && !useremail && !todotext) {
          return next(res.json({ message: "Заполните все поля задачи" }));
        }

        if (!emailRegex.test(useremail)) {
          return next(res.json({ message: "Невалидный email" }));
        }

        const todo = await Todo.create({
          username,
          useremail,
          todotext,
        });
        return res.json(todo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAll(req, res) {
    let { limit, page, selectedSort } = req.query;
    page = page || 1;
    limit = limit || 3;
    let offset = page * limit - limit;

    const todos = await Todo.findAndCountAll({
      limit,
      offset,
      order: [[`${selectedSort}`, "ASC"]],
    });

    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("x-total-count", todos.count);

    return res.json(todos);
  }
}

module.exports = new TodoController();
