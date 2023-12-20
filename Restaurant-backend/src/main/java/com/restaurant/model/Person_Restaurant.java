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

    private Date lastModifiedDate = new Date();

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

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
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
