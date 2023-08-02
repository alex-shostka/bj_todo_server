const Router = require("express");
const router = new Router();
const todoController = require("../controllers/todoController");

router.post("/", todoController.createOrUpdate);
router.get("/", todoController.getAll);

module.exports = router;
