const express = require("express");
const router = express.Router();
const { favoriteService } = require("../container");
const FavoriteDTO = require("../dto/favorite.dto");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Обрані оголошення користувача
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteDTO:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 2
 *         ad_id:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Отримати всі обрані оголошення
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Список обраного
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteDTO'
 */
router.get("/", async (req, res) => {
  const favorites = await favoriteService.getAllFavorites();
  res.json(favorites.map(f => new FavoriteDTO(f)));
});

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Додати оголошення в обране
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteDTO'
 *     responses:
 *       201:
 *         description: Додано в обране
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const fav = await favoriteService.addFavorite(req.body);
    res.status(201).json(new FavoriteDTO(fav));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/favorites/{user_id}/{ad_id}:
 *   delete:
 *     summary: Видалити оголошення з обраного
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: ad_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Видалено з обраного
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Не знайдено в обраному
 */
router.delete("/:user_id/:ad_id", async (req, res) => {
  try {
    await favoriteService.removeFavorite(Number(req.params.user_id), Number(req.params.ad_id));
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

module.exports = router;