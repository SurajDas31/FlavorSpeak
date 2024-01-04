package com.restaurant.service;

import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;
import com.restaurant.model.auth.registerUser.UserRegister;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;


public interface AuthenticationService {

    String signUp(UserRegister userRegister);

    AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response);

    public boolean validAccessToken(String accessToken);

}
