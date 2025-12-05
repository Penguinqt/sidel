package com.sidelbackend.Controller;

import com.sidelbackend.Entity.ReviewEntity;
import com.sidelbackend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewEntity> create(@RequestBody ReviewEntity review) {
        return ResponseEntity.ok(reviewService.createReview(review));
    }

    @GetMapping
    public ResponseEntity<List<ReviewEntity>> getAll() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewEntity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewEntity> update(@PathVariable Long id, @RequestBody ReviewEntity review) {
        return ResponseEntity.ok(reviewService.updateReview(id, review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted.");
    }
}
