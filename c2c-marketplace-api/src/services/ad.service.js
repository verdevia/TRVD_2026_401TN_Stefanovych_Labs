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

  async updateAd(id, data) {
    return await this.adRepository.update(id, data);
  }

  async deleteAd(id) {
    return await this.adRepository.delete(id);
  }
}

module.exports = AdService;