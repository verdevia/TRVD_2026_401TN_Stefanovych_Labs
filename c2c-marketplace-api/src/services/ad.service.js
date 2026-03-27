class AdService {
  constructor(adRepository) {
    this.adRepository = adRepository;
  }

  async getAllAds() {
    return await this.adRepository.findAll();
  }

  async getAd(id) {
    return await this.adRepository.findById(id);
  }

  async createAd(data) {
    return await this.adRepository.create(data);
  }

  async updateAd(id, data, currentUser) {
    const ad = await this.adRepository.findById(id);
    if (!ad) {
      throw new Error("Ad not found");
    }

    const isOwner = ad.user_id === currentUser.userId;
    const isModeratorOrAdmin = currentUser.role === "moderator" || currentUser.role === "admin";

    if (data.status !== undefined) {
      if (!isOwner && !isModeratorOrAdmin) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      }
    } else {
      if (!isOwner) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      }
    }

    return await this.adRepository.update(id, data);
  }

  async deleteAd(id, currentUser) {
  const ad = await this.adRepository.findById(id);

  if (!ad) {
    throw new Error("Ad not found");
  }

  const isOwner = ad.user_id === currentUser.userId;
  const isModeratorOrAdmin =
    currentUser.role === "moderator" || currentUser.role === "admin";

  if (!isOwner && !isModeratorOrAdmin) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return await this.adRepository.delete(id);
}
}

module.exports = AdService;