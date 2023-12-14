package com.restaurant.controller;

import com.restaurant.model.restaurant.Restaurant;
import com.restaurant.repository.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurant")
public class RestaurantController {

    private RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }


    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Restaurant restaurant){
        Restaurant save = restaurantRepository.save(restaurant);
        return new ResponseEntity(save, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity get(@PathVariable("id") int id){
        Restaurant restaurant = restaurantRepository.findById(id);
        if(restaurant == null)
            return new ResponseEntity("{\"status\":\"NOT FOUND\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(restaurant, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity getAll(){
        List<Restaurant> restaurantList = restaurantRepository.findAll();

        return new ResponseEntity(restaurantList, HttpStatus.OK);
    }
}
