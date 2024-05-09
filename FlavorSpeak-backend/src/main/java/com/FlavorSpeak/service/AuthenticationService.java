package com.FlavorSpeak.service;

import com.FlavorSpeak.model.auth.AuthenticationRequest;
import com.FlavorSpeak.model.auth.AuthenticationResponse;
import com.FlavorSpeak.model.auth.registerUser.UserRegister;


public interface AuthenticationService {

    String signUp(UserRegister userRegister);

    AuthenticationResponse login(AuthenticationRequest request, AuthenticationResponse response);

    public boolean validAccessToken(String accessToken);

}
