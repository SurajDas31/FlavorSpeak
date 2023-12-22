package com.restaurant.model;

import com.restaurant.model.restaurant.Restaurant;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Person_Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "person_restaurant_seq")
    @SequenceGenerator(name = "person_restaurant_seq", allocationSize = 100)
    private int id;

    private long lastModifiedDate = System.currentTimeMillis() / 1000L;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    private String rating;

    private String reviews;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(long lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }


}
