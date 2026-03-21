const express = require("express");
const router = express.Router();

const { userService } = require("../container");
const UserDTO = require("../dto/user.dto");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Користувачі системи
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           example: user
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Отримати всіх користувачів
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список користувачів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDTO'
 */
router.get("/", async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users.map(u => new UserDTO(u)));
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Отримати користувача за ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Користувач знайдений
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       404:
 *         description: Користувача не знайдено
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    res.json(new UserDTO(user));
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Створити нового користувача
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password_hash:
 *                 type: string
 *                 example: hashed_password
 *     responses:
 *       201:
 *         description: Користувач створений
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(new UserDTO(user));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Видалити користувача за ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Користувач видалений
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Користувача не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;