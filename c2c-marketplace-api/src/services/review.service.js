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

  async updateReview(id, data, currentUser) {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }

    const isOwner = review.reviewer_id === currentUser.userId;
    const isModeratorOrAdmin = currentUser.role === "moderator" || currentUser.role === "admin";

    if (!isOwner && !isModeratorOrAdmin) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    return await this.reviewRepository.update(id, data);
  }

  async deleteReview(id, currentUser) {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }

    const isOwner = review.reviewer_id === currentUser.userId;
    const isModeratorOrAdmin = currentUser.role === "moderator" || currentUser.role === "admin";

    if (!isOwner && !isModeratorOrAdmin) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    return await this.reviewRepository.delete(id);
  }
}

module.exports = ReviewService;