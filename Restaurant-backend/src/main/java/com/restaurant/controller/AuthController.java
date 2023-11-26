package com.restaurant.controller;

import com.restaurant.model.registerUser.UserRegister;
import com.restaurant.service.AuthenticationService;
import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/")
@CrossOrigin("*")
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
        System.out.println(authenticationResponse);
        if(authenticationResponse == null)
            return new ResponseEntity<>("{\"status\":\"Username/Email id not valid\"}", HttpStatus.BAD_REQUEST);

        if (authenticationResponse.getStatus().equals("Bad Credentials")) {
            return new ResponseEntity<>("{\"status\":\"BAD CREDENTIALS\"}", HttpStatus.UNAUTHORIZED);
        }
        if(authenticationResponse.getStatus().equals("Locked")){
            return new ResponseEntity<>("{\"status\":\"Locked\"}", HttpStatus.LOCKED);
        }
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("signup")
    public ResponseEntity<?> signUp(@RequestBody UserRegister register) {
        System.out.println(register);
        try {
            String result = service.signUp(register);
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
