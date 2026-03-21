class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async getAllReviews() {
    return await this.reviewRepository.findAll();
  }

  async getReview(id) {
    return await this.reviewRepository.findById(id);
  }

  async createReview(data) {
    return await this.reviewRepository.create(data);
  }

  async updateReview(id, data) {
    return await this.reviewRepository.update(id, data);
  }

  async deleteReview(id) {
    return await this.reviewRepository.delete(id);
  }
}

module.exports = ReviewService;