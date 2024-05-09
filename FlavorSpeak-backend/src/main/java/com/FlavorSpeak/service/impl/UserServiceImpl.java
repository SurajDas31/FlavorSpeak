package com.FlavorSpeak.service.impl;

import com.FlavorSpeak.model.Person;
import com.FlavorSpeak.model.person.Person_Image;
import com.FlavorSpeak.repository.UserImageRepository;
import com.FlavorSpeak.repository.UserRepository;
import com.FlavorSpeak.service.JWTService;
import com.FlavorSpeak.service.UserService;
import com.FlavorSpeak.util.FileStorageService;
import com.FlavorSpeak.util.security.AESEncryption;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private FileStorageService fileStorageService;

    private UserImageRepository userImageRepository;

    private JWTService jwtService;

    private AESEncryption aesEncryption;


    public UserServiceImpl(UserRepository userRepository, FileStorageService fileStorageService, UserImageRepository userImageRepository, JWTService jwtService, AESEncryption aesEncryption) {
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
        this.userImageRepository = userImageRepository;
        this.jwtService = jwtService;
        this.aesEncryption = aesEncryption;
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

    @Override
    public void updateProfilePicture(MultipartFile file, String authorization) throws Exception {
        if (authorization == null) return;

        authorization = authorization.replace("Bearer ", "");
        String emailId = jwtService.extractUsername(authorization);
        Person person = userRepository.findByEmail(emailId);
        Person_Image person_image = new Person_Image();

        try {
            String fileName = aesEncryption.encryptString(person.getId() + "PP");
            System.out.println("File Name: " + file.getOriginalFilename());
            person_image.setFileName(fileName);
            person_image.setFileSize(file.getSize());
            person_image.setFileType(file.getContentType());
            person_image.setType(FilenameUtils.getExtension(file.getOriginalFilename()));
            person_image.setPerson(person);
            boolean store = fileStorageService.store(file, fileName);
            if (store)
                userImageRepository.save(person_image);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Override
    public byte[] getProfilePicture(String authorization) throws Exception {
        assert authorization != null;
        authorization = authorization.replace("Bearer ", "");
        String emailId = jwtService.extractUsername(authorization);
        Person person = userRepository.findByEmail(emailId);
        File file = null;
        byte[] result = null;
        try {
            Person_Image personImage = userImageRepository.findFirstByPersonOrderByLastModifiedDateDesc(person);
            file = fileStorageService.getFile(personImage);
            result = FileUtils.readFileToByteArray(file);
        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            if (file != null) {
                FileUtils.deleteQuietly(file);
            }
        }
        return result;
    }

    @Override
    public byte[] getProfilePictureById(Person_Image personImage) throws Exception {


        File file = null;
        byte[] result = null;
        try {
            file = fileStorageService.getFile(personImage);
            if (file == null) return null;
            result = FileUtils.readFileToByteArray(file);

        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            if (file != null) {
                FileUtils.delete(file);
            }
        }
        return result;
    }

    @Override
    public Person_Image getPersonImage(String id) throws Exception {
        Person person = userRepository.findById(Integer.parseInt(id));
        Person_Image personImage = userImageRepository.findFirstByPersonOrderByLastModifiedDateDesc(person);
        return personImage;
    }
}