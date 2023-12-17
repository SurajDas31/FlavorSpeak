package com.restaurant.repository;

import com.restaurant.model.Person_Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRestaurantRepository extends JpaRepository<Person_Restaurant, Integer> {

    @Override
    List<Person_Restaurant> findAllById(Iterable<Integer> integers);
}
