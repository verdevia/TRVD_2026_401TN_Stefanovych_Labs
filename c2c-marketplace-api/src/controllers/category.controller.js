const express = require("express");
const router = express.Router();

const { categoryService } = require("../container");
const CategoryDTO = require("../dto/category.dto");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Категорії товарів
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Electronics
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Отримати всі категорії
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список категорій
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryDTO'
 */
router.get("/", async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories.map(c => new CategoryDTO(c)));
});

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Отримати категорію за ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категорія знайдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDTO'
 *       404:
 *         description: Категорію не знайдено
 */
router.get("/:id", async (req, res) => {
  try {
    const category = await categoryService.getCategory(Number(req.params.id));
    res.json(new CategoryDTO(category));
  } catch {
    res.status(404).json({ error: "Category not found" });
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Створити нову категорію
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категорія створена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryDTO'
 *       400:
 *         description: Некоректні дані
 */
router.post("/", async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(new CategoryDTO(category));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Видалити категорію за ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категорія видалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted
 *       404:
 *         description: Категорію не знайдено
 */
router.delete("/:id", async (req, res) => {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Category not found" });
  }
});

module.exports = router;