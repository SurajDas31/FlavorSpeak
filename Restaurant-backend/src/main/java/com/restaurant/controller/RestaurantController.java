package com.restaurant.controller;

import com.restaurant.model.Person_Restaurant;
import com.restaurant.model.restaurant.Restaurant;
import com.restaurant.model.restaurant.RestaurantReviewPosting;
import com.restaurant.repository.RestaurantRepository;
import com.restaurant.repository.UserRestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurant")
public class RestaurantController {

    private RestaurantRepository restaurantRepository;

    private UserRestaurantRepository userRestaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository, UserRestaurantRepository userRestaurantRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRestaurantRepository = userRestaurantRepository;
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Restaurant restaurant) {
        Restaurant save = restaurantRepository.save(restaurant);
        return new ResponseEntity(save, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity get(@PathVariable("id") int id) {
        Restaurant restaurant = restaurantRepository.findById(id);
        if (restaurant == null) return new ResponseEntity("{\"status\":\"NOT FOUND\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(restaurant, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity getAll() {
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        return new ResponseEntity(restaurantList, HttpStatus.OK);
    }

    @PostMapping("/review/save")
    public ResponseEntity saveReviews(@RequestBody RestaurantReviewPosting restaurantReviewPosting) {
        System.out.println(restaurantReviewPosting);

        return new ResponseEntity("", HttpStatus.OK);
    }

    @GetMapping("/review/get/{id}")
    public ResponseEntity getReview(@PathVariable("id") int id) {
        List<Person_Restaurant> person_restaurants = userRestaurantRepository.findPerson_RestaurantByRestaurantId(id);
        return new ResponseEntity(person_restaurants, HttpStatus.OK);
    }

}
