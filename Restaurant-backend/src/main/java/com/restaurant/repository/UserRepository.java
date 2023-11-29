package com.restaurant.repository;

import com.restaurant.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Person, Integer> {

    Person findByEmail(String email);

    Person findById(int id);
}
