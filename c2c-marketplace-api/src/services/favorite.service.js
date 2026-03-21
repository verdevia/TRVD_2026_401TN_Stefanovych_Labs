class FavoriteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async getAllFavorites() {
    return await this.favoriteRepository.findAll();
  }

  async getFavorite(user_id, ad_id) {
    return await this.favoriteRepository.findById(user_id, ad_id);
  }

  async createFavorite(data) {
    return await this.favoriteRepository.create(data);
  }

  async deleteFavorite(user_id, ad_id) {
    return await this.favoriteRepository.delete(user_id, ad_id);
  }
}

module.exports = FavoriteService;