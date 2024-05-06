package com.restaurant.service;

import com.restaurant.model.Person;
import com.restaurant.model.person.Person_Image;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    boolean updatePerson(Person person);

    void updateProfilePicture(MultipartFile file, String authorization) throws Exception;

    byte[] getProfilePicture(String authorization) throws Exception;

    byte[] getProfilePictureById(Person_Image personImage) throws Exception;

    Person_Image getPersonImage(String id) throws Exception;
}
