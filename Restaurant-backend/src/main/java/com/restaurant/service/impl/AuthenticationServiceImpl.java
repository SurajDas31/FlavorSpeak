package com.restaurant.service.impl;

import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.AuthenticationService;
import com.restaurant.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository repository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    public AuthenticationServiceImpl(UserRepository repository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JWTService jwtService) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public String signUp(Person person) {
        System.out.println(person);
        Person personByEmail = repository.findByEmail(person.getEmail());

        if(personByEmail != null){
            return "User already exists";
        }
        System.out.println(person.getPassword());

        person.setPassword(passwordEncoder.encode(person.getPassword()));

        repository.save(person);

        return "true";
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Person person = repository.findByEmail(request.getEmail());

        if(person == null){
            return null;
        }
        String generateToken = jwtService.generateToken(person);
        String generateRefreshToken = jwtService.generateRefreshToken(person);

        response.setAccessToken(generateToken);
        response.setPerson(person);

        return response;
    }
}
