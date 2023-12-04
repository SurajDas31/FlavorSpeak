package com.restaurant.controller;

import com.restaurant.model.Person;
import com.restaurant.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/get")
    public ResponseEntity getProfile(@RequestBody int id) {
        Person person = userRepository.findById(id);
        if (person == null)
            return new ResponseEntity<>("{\"status\":\"Locked\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(person, HttpStatus.OK);
    }

}