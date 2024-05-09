package com.FlavorSpeak.repository;

import com.FlavorSpeak.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Person, Integer> {

    Person findByEmail(String email);

    Person findById(int id);
}
