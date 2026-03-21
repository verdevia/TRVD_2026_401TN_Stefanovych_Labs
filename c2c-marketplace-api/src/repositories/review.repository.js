class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findById(id) {
    return this.prisma.review.findUnique({
      where: { review_id: id },
    });
  }

  create(data) {
    return this.prisma.review.create({ data });
  }

  update(id, data) {
    return this.prisma.review.update({
      where: { review_id: id },
      data,
    });
  }

  delete(id) {
    return this.prisma.review.delete({
      where: { review_id: id },
    });
  }
}

module.exports = ReviewRepository;