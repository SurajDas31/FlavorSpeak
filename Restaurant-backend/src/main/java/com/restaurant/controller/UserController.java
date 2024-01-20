package com.restaurant.controller;

import com.restaurant.model.Person;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private UserRepository userRepository;

    private UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getProfile(@PathVariable("id") int id) {
        Person person = userRepository.findById(id);
        if (person == null)
            return new ResponseEntity<>("{\"status\":\"Not Found\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(person, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity updateProfile(@RequestBody Person person){
        boolean result = userService.updatePerson(person);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity getAllProfile(){
        List<Person> personList = userRepository.findAll();
        return new ResponseEntity(personList, HttpStatus.OK);
    }
}