package com.restaurant.service.impl;

import com.restaurant.model.Person;
import com.restaurant.model.Person_Restaurant;
import com.restaurant.model.restaurant.Restaurant;
import com.restaurant.model.restaurant.RestaurantReviewPosting;
import com.restaurant.repository.RestaurantRepository;
import com.restaurant.repository.UserRepository;
import com.restaurant.repository.UserRestaurantRepository;
import com.restaurant.service.JWTService;
import com.restaurant.service.RestaurantService;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private JWTService jwtService;

    private UserRepository userRepository;

    private RestaurantRepository restaurantRepository;

    private UserRestaurantRepository userRestaurantRepository;

    public RestaurantServiceImpl(JWTService jwtService, UserRepository userRepository, RestaurantRepository restaurantRepository, UserRestaurantRepository userRestaurantRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.userRestaurantRepository = userRestaurantRepository;
    }

    @Override
    public void saveReviews(RestaurantReviewPosting restaurantReviewPosting, String authorization) {
        if (authorization == null) return;

        authorization = authorization.replace("Bearer ", "");

        String emailId = jwtService.extractUsername(authorization);

        Person person = userRepository.findByEmail(emailId);

        Restaurant restaurant = restaurantRepository.findById(restaurantReviewPosting.getRestaurantId());

        Person_Restaurant person_restaurant = new Person_Restaurant();
        person_restaurant.setPerson(person);
        person_restaurant.setRestaurant(restaurant);
        person_restaurant.setReviews(restaurantReviewPosting.getReviewComment());
        person_restaurant.setRating(restaurantReviewPosting.getRating());

        userRestaurantRepository.save(person_restaurant);
    }
}
