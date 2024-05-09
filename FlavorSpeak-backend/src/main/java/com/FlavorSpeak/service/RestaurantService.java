package com.FlavorSpeak.service;

import com.FlavorSpeak.model.restaurant.RestaurantReviewPosting;

public interface RestaurantService {

    void saveReviews(RestaurantReviewPosting restaurantReviewPosting, String authorization);
}
