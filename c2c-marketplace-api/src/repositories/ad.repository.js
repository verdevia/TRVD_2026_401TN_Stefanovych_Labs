class AdRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.ad.findMany();
  }

  findById(id) {
    return this.prisma.ad.findUnique({
      where: { ad_id: id },
    });
  }

  create(data) {
    return this.prisma.ad.create({ data });
  }

  update(id, data) {
    return this.prisma.ad.update({
      where: { ad_id: id },
      data,
    });
  }

  delete(id) {
    return this.prisma.ad.delete({
      where: { ad_id: id },
    });
  }
}

module.exports = AdRepository;