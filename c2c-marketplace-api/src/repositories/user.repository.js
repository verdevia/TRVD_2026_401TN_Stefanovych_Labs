class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id) {
    return this.prisma.user.findUnique({
      where: { user_id: id }
    });
  }

  create(data) {
    return this.prisma.user.create({ data });
  }

  update(id, data) {
    return this.prisma.user.update({
      where: { user_id: id },
      data
    });
  }

  delete(id) {
    return this.prisma.user.delete({
      where: { user_id: id }
    });
  }

  findByEmail(email) {
  return this.prisma.user.findUnique({
    where: { email },
  });
}
}

module.exports = UserRepository;