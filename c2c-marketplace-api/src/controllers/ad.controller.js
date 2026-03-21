const express = require("express");
const router = express.Router();

const { adService } = require("../container");
const AdDTO = require("../dto/ad.dto");

/**
 * @swagger
 * tags:
 *   name: Ads
 *   description: Оголошення користувачів
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         category_id:
 *           type: integer
 *           example: 2
 *         title:
 *           type: string
 *           example: "iPhone 14 Pro"
 *         description:
 *           type: string
 *           example: "Продам майже новий iPhone 14 Pro, стан відмінний"
 *         price:
 *           type: number
 *           example: 1200.50
 *         status:
 *           type: string
 *           example: "active"
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/ads:
 *   get:
 *     summary: Отримати всі оголошення
 *     tags: [Ads]
 *     responses:
 *       200:
 *         description: Список оголошень
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdDTO'
 */
router.get("/", async (req, res) => {
  const ads = await adService.getAllAds();
  res.json(ads.map(a => new AdDTO(a)));
});

/**
 * @swagger
 * /api/ads/{id}:
 *   get:
 *     summary: Отримати оголошення за ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Оголошення знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdDTO'
 *       404:
 *         description: Оголошення не знайдено
 */
router.get("/:id", async (req, res) => {
  try {
    const ad = await adService.getAd(Number(req.params.id));
    res.json(new AdDTO(ad));
  } catch {
    res.status(404).json({ error: "Ad not found" });
  }
});

/**
 * @swagger
 * /api/ads:
 *   post:
 *     summary: Створити нове оголошення
 *     tags: [Ads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Оголошення створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const ad = await adService.createAd(req.body);
    res.status(201).json(new AdDTO(ad));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/ads/{id}:
 *   delete:
 *     summary: Видалити оголошення за ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Оголошення видалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Оголошення не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    await adService.deleteAd(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Ad not found" });
  }
});

/**
 * @swagger
 * /api/ads/{id}:
 *   patch:
 *     summary: Часткове оновлення оголошення
 *     tags: [Ads]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [active, sold, removed]
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Оголошення оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdDTO'
 *       404:
 *         description: Оголошення не знайдено
 *       400:
 *         description: Некоректні дані
 */
router.patch("/:id", async (req, res) => {
  try {
    const ad = await adService.updateAd(Number(req.params.id), req.body);
    res.json(new AdDTO(ad));
  } catch (e) {
    if (e.message === "Ad not found") {
      res.status(404).json({ error: e.message });
    } else {
      res.status(400).json({ error: e.message });
    }
  }
});

module.exports = router;