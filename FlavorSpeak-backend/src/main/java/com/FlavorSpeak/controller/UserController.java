package com.FlavorSpeak.controller;

import com.FlavorSpeak.model.Person;
import com.FlavorSpeak.model.person.Person_Image;
import com.FlavorSpeak.repository.UserRepository;
import com.FlavorSpeak.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private UserRepository userRepository;

    private UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getProfile(@PathVariable("id") int id) {
        Person person = userRepository.findById(id);
        if (person == null)
            return new ResponseEntity<>("{\"status\":\"Not Found\"}", HttpStatus.NOT_FOUND);

        return new ResponseEntity(person, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity getAllProfile() {
        List<Person> personList = userRepository.findAll();
        return new ResponseEntity(personList, HttpStatus.OK);
    }

    @GetMapping(value = "/get/profile-picture", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity getProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) throws Exception {

        byte[] profilePicture = userService.getProfilePicture(authorization);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(profilePicture);

    }

    @GetMapping(value = "/get/profile-picture/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity getProfilePictureById(@PathVariable String id) throws Exception {

        Person_Image personImage = userService.getPersonImage(id);
        byte[] profilePicture = userService.getProfilePictureById(personImage);

        MediaType mediaType = null;
        if (personImage.getFileType().equals(MediaType.IMAGE_JPEG_VALUE))
            mediaType = MediaType.IMAGE_JPEG;
        else if (personImage.getFileType().equals(MediaType.IMAGE_GIF_VALUE))
            mediaType = MediaType.IMAGE_GIF;
        else if (personImage.getFileType().equals(MediaType.IMAGE_PNG_VALUE))
            mediaType = MediaType.IMAGE_PNG;

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + personImage.getFileName() + "." + personImage.getType() + "\"")
                .body(profilePicture);
    }

    @PostMapping("/update")
    public ResponseEntity updateProfile(@RequestBody Person person) {
        boolean result = userService.updatePerson(person);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/update/profile-picture")
    public ResponseEntity updateProfilePicture(@RequestParam("file") MultipartFile file, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) throws Exception {
        try {
            userService.updateProfilePicture(file, authorization);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Could not store file" + file.getOriginalFilename() + ". Please try again!", e);
        }
        return ResponseEntity.ok("File saved");
    }

}