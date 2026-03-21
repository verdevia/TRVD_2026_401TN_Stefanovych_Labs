const express = require("express");
const router = express.Router();
const { reviewService } = require("../container");
const ReviewDTO = require("../dto/review.dto");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Відгуки користувачів
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewDTO:
 *       type: object
 *       properties:
 *         review_id:
 *           type: integer
 *           example: 1
 *         reviewer_id:
 *           type: integer
 *           example: 2
 *         reviewed_user_id:
 *           type: integer
 *           example: 3
 *         rating:
 *           type: integer
 *           example: 5
 *         comment:
 *           type: string
 *           example: "Відмінний продавець!"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2026-03-21T15:30:00Z"
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Отримати всі відгуки
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Список відгуків
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewDTO'
 */
router.get("/", async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  res.json(reviews.map(r => new ReviewDTO(r)));
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Отримати відгук за ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Відгук знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewDTO'
 *       404:
 *         description: Відгук не знайдено
 */
router.get("/:id", async (req, res) => {
  try {
    const review = await reviewService.getReview(Number(req.params.id));
    res.json(new ReviewDTO(review));
  } catch {
    res.status(404).json({ error: "Review not found" });
  }
});

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Створити новий відгук
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewDTO'
 *     responses:
 *       201:
 *         description: Відгук створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(new ReviewDTO(review));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   patch:
 *     summary: Часткове оновлення відгуку
 *     tags: [Reviews]
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
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Відгук оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewDTO'
 *       404:
 *         description: Відгук не знайдено
 *       400:
 *         description: Некоректні дані
 */
router.patch("/:id", async (req, res) => {
  try {
    const review = await reviewService.updateReview(Number(req.params.id), req.body);
    res.json(new ReviewDTO(review));
  } catch (e) {
    if (e.message === "Review not found") {
      res.status(404).json({ error: e.message });
    } else {
      res.status(400).json({ error: e.message });
    }
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Видалити відгук за ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Відгук видалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Відгук не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    await reviewService.deleteReview(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = router;