package com.restaurant.model.auth;

import com.restaurant.model.Person;

public class AuthenticationResponse {

    private String accessToken;
    private Person person;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
