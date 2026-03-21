class FavoriteRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.favorite.findMany();
  }

  findById(user_id, ad_id) {
    return this.prisma.favorite.findUnique({
      where: { user_id_ad_id: { user_id, ad_id } },
    });
  }

  create(data) {
    return this.prisma.favorite.create({ data });
  }

  delete(user_id, ad_id) {
    return this.prisma.favorite.delete({
      where: { user_id_ad_id: { user_id, ad_id } },
    });
  }
}

module.exports = FavoriteRepository;