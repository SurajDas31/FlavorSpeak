package com.restaurant.controller;

import com.restaurant.model.Person;
import com.restaurant.repository.UserRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getProfile(@PathVariable("id") int id) {
        Person person = userRepository.findById(id);
        if (person == null)
            return new ResponseEntity<>("{\"status\":\"Not Found\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(person, HttpStatus.OK);
    }

    @GetMapping("/get/")
    public ResponseEntity getProfile(@RequestParam String email) {
        Person person = userRepository.findByEmail(email);
        if(person == null)
            return new ResponseEntity<>("{\"status\":\"Not Found\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(person, HttpStatus.OK);
    }

}
