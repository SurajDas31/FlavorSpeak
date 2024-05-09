package com.FlavorSpeak.repository;

import com.FlavorSpeak.model.Person_Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRestaurantRepository extends JpaRepository<Person_Restaurant, Integer> {

     List<Person_Restaurant> findPerson_RestaurantByRestaurantId(int id);
}
