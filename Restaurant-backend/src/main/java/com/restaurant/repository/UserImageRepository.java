package com.restaurant.repository;

import com.restaurant.model.Person;
import com.restaurant.model.person.Person_Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<Person_Image, Integer> {

    Person_Image findFirstByPersonOrderByLastModifiedDateDesc(Person person);
}
