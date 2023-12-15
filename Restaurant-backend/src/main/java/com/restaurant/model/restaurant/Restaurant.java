package com.restaurant.model.restaurant;

import com.restaurant.model.Person;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "restaurant_seq")
    @SequenceGenerator(name = "restaurant_seq", allocationSize = 100)
    private int id;

    private String name;

    private String ownerName;

    private String mobileNo;

    private String description;

    private String city;

    private String state;

    @OneToMany(mappedBy = "restaurant")
    private Set<Person> person;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
