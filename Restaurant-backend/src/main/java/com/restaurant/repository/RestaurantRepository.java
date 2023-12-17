package com.restaurant.repository;

import com.restaurant.model.restaurant.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    Restaurant findById(int id);

    @Override
    List<Restaurant> findAll();

}
