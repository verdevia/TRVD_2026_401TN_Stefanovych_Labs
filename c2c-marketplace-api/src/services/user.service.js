class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(data) {
    if (!data.username || !data.email || !data.password_hash) {
      throw new Error("Missing required fields");
    }

    return await this.userRepository.create(data);
  }

  async updateUser(id, data) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.update(id, data);
  }

  async updateUserRole(id, role, currentUser) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const isModeratorOrAdmin = currentUser.role === "moderator" || currentUser.role === "admin";
    if (!isModeratorOrAdmin) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    if (!["user", "moderator", "admin"].includes(role)) {
      throw new Error("Invalid role");
    }

    return await this.userRepository.update(id, { role });
  }

  async deleteUser(id, currentUser) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const isOwner = user.id === currentUser.userId;
    const isModeratorOrAdmin = currentUser.role === "moderator" || currentUser.role === "admin";

    if (!isOwner && !isModeratorOrAdmin) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;