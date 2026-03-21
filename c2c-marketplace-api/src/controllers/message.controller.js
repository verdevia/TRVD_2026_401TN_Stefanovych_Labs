const express = require("express");
const router = express.Router();
const { messageService } = require("../container");
const MessageDTO = require("../dto/message.dto");

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Повідомлення між користувачами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MessageDTO:
 *       type: object
 *       properties:
 *         message_id:
 *           type: integer
 *           example: 1
 *         sender_id:
 *           type: integer
 *           example: 2
 *         receiver_id:
 *           type: integer
 *           example: 3
 *         ad_id:
 *           type: integer
 *           example: 10
 *         content:
 *           type: string
 *           example: "Привіт, цікавить товар!"
 *         sent_at:
 *           type: string
 *           format: date-time
 *           example: "2026-03-21T15:30:00Z"
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Отримати всі повідомлення
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Список повідомлень
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageDTO'
 */
router.get("/", async (req, res) => {
  const messages = await messageService.getAllMessages();
  res.json(messages.map(m => new MessageDTO(m)));
});

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Отримати повідомлення за ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Повідомлення знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageDTO'
 *       404:
 *         description: Повідомлення не знайдено
 */
router.get("/:id", async (req, res) => {
  try {
    const message = await messageService.getMessage(Number(req.params.id));
    res.json(new MessageDTO(message));
  } catch {
    res.status(404).json({ error: "Message not found" });
  }
});

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Створити нове повідомлення
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageDTO'
 *     responses:
 *       201:
 *         description: Повідомлення створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json(new MessageDTO(message));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/messages/{id}:
 *   patch:
 *     summary: Часткове оновлення повідомлення
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Повідомлення оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageDTO'
 *       404:
 *         description: Повідомлення не знайдено
 *       400:
 *         description: Некоректні дані
 */
router.patch("/:id", async (req, res) => {
  try {
    const message = await messageService.updateMessage(Number(req.params.id), req.body);
    res.json(new MessageDTO(message));
  } catch (e) {
    if (e.message === "Message not found") {
      res.status(404).json({ error: e.message });
    } else {
      res.status(400).json({ error: e.message });
    }
  }
});

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Видалити повідомлення за ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Повідомлення видалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Повідомлення не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    await messageService.deleteMessage(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Message not found" });
  }
});

module.exports = router;