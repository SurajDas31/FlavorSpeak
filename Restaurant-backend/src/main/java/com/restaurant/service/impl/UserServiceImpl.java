package com.restaurant.service.impl;

import com.restaurant.model.Person;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean updatePerson(Person person) {
        try {
            Person person1 = userRepository.findById(person.getId());
            person1.setFirstName(person.getFirstName());
            person1.setLastName(person.getLastName());
            person1.setEmail(person.getEmail());
            person1.setRole(person.getRole());
            person1.setMobileNo(person.getMobileNo());
            person1.setLastModifiedDate(System.currentTimeMillis());
            person1.setEnabled(true);

            userRepository.save(person1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
