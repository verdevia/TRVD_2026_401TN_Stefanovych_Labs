class MessageRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findById(id) {
    return this.prisma.message.findUnique({
      where: { message_id: id },
    });
  }

  create(data) {
    return this.prisma.message.create({ data });
  }

  update(id, data) {
    return this.prisma.message.update({
      where: { message_id: id },
      data,
    });
  }

  delete(id) {
    return this.prisma.message.delete({
      where: { message_id: id },
    });
  }
}

module.exports = MessageRepository;