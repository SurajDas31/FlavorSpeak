package com.FlavorSpeak.repository;

import com.FlavorSpeak.model.Person;
import com.FlavorSpeak.model.person.Person_Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<Person_Image, Integer> {

    Person_Image findFirstByPersonOrderByLastModifiedDateDesc(Person person);
}
