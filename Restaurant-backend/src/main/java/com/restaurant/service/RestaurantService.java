package com.restaurant.service;

import com.restaurant.model.restaurant.RestaurantReviewPosting;

public interface RestaurantService {

    void saveReviews(RestaurantReviewPosting restaurantReviewPosting, String authorization);
}
