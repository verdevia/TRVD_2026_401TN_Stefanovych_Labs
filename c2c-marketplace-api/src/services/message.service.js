class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async getAllMessages() {
    return await this.messageRepository.findAll();
  }

  async getMessage(id) {
    return await this.messageRepository.findById(id);
  }

  async createMessage(data) {
    return await this.messageRepository.create(data);
  }

  async updateMessage(id, data) {
    return await this.messageRepository.update(id, data);
  }

  async deleteMessage(id) {
    return await this.messageRepository.delete(id);
  }
}

module.exports = MessageService;