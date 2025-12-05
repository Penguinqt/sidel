package com.sidelbackend.Service;


import com.sidelbackend.Entity.ReviewEntity;
import com.sidelbackend.Repositories.ReviewRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepositories reviewRepository;

    public ReviewService(ReviewRepositories reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewEntity> getAllReviews() {
        return reviewRepository.findAll();
    }

    public ReviewEntity getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public ReviewEntity createReview(ReviewEntity review) {
        return reviewRepository.save(review);
    }

    public ReviewEntity updateReview(Long id, ReviewEntity newData) {
        ReviewEntity r = getReviewById(id);
        if (r == null) return null;

        r.setRating(newData.getRating());
        r.setComments(newData.getComments());
        r.setReviewDate(newData.getReviewDate());

        return reviewRepository.save(r);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
