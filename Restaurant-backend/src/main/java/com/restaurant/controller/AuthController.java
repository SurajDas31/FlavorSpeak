package com.restaurant.controller;

import com.restaurant.service.AuthenticationService;
import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

    private AuthenticationService service;

    public AuthController(AuthenticationService service) {
        this.service = service;
    }

    @GetMapping()
    public String home() {
        return "Chla";
    }

    @PostMapping("login")
    public ResponseEntity<?> doLogin(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        service.login(request, authenticationResponse);
        if (authenticationResponse == null) {
            return new ResponseEntity<>("{\"status\":\"UNAUTHORIZED\"}", HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("signup")
    public ResponseEntity<?> signUp(@RequestBody Person person) {
        System.out.println(person);
        try {
            String result = service.signUp(person);
            if (result.equals("User already exists")) {
                return new ResponseEntity<String>("{\"status\":\"User already exists.\"}", HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("{\"status\":\"User has been created.\"}", HttpStatus.CREATED);
    }
}
