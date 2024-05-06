package com.restaurant.model.restaurant;

import com.restaurant.model.Person;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Restaurant {

    @Id
    @GeneratedValue
    private int id;

    private long lastModifiedDate = System.currentTimeMillis() / 1000L;

    private String name;

    private String ownerName;

    private String mobileNo;

    private String description;

    private String city;

    private String state;

    @ManyToMany(mappedBy = "restaurant")
    private Set<Person> person;

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
