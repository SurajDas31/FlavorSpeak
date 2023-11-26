package com.restaurant.service.impl;

import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import com.restaurant.model.registerUser.UserRegister;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.AuthenticationService;
import com.restaurant.service.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    public String signUp(UserRegister userRegister) {
        System.out.println(userRegister);
        Person person = repository.findByEmail(userRegister.getEmail());

        if(person != null){
            return "User already exists";
        }
        System.out.println(userRegister.getPassword());

        person = new Person();
        person.setFirstName(userRegister.getFirstName());
        person.setLastName(userRegister.getLastName());
        person.setMobileNo(userRegister.getMobileNo());
        person.setEmail(userRegister.getEmail());
        person.setPassword(passwordEncoder.encode(userRegister.getPassword()));
        person.setRole(userRegister.getRole());

        repository.save(person);

        return "true";
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response) {
        try{
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        }catch (BadCredentialsException exception){
            response.setStatus("Bad Credentials");
            return response;
        }catch (LockedException exception){
            response.setStatus("Locked");
            return response;
        }

        Person person = repository.findByEmail(request.getEmail());

        if(person == null){
            return null;
        }
        String generateToken = jwtService.generateToken(person);
        String refreshToken = jwtService.generateRefreshToken(person);

        response.setAccessToken(generateToken);
        response.setRefreshToken(refreshToken);
        response.setStatus("true");
        response.setPerson(person);

        return response;
    }
}
