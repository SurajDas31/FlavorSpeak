package com.restaurant.service;

import com.restaurant.model.Person;
import com.restaurant.model.auth.AuthenticationRequest;
import com.restaurant.model.auth.AuthenticationResponse;

public interface AuthenticationService {

    String signUp(Person person);

    AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response);

}
