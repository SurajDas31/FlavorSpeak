package com.FlavorSpeak.util;

import com.FlavorSpeak.model.person.Person_Image;
import com.FlavorSpeak.util.security.AESEncryption;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
public class FileStorageService {

    @Value(value = "${application.repository}")
    private String REPOSITORY_URL;

    private AESEncryption aesEncryption;


    public FileStorageService(AESEncryption aesEncryption) {
        this.aesEncryption = aesEncryption;
    }

    public void init() {
        // To check if Repository directories has created.
        Path path = Paths.get(REPOSITORY_URL);
        if (!path.toFile().exists())
            new File(REPOSITORY_URL).mkdirs();

    }

    public boolean store(MultipartFile file, String fileName) throws IOException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeySpecException, InvalidKeyException {
        File outputFile = null;
        FileInputStream inputStream = null;
        try {
            init();
            Path targetLocation = Paths.get(REPOSITORY_URL + fileName).toAbsolutePath().normalize();
            outputFile = File.createTempFile("temp", "");
            inputStream = (FileInputStream) file.getInputStream();
            aesEncryption.encryptFile(inputStream, outputFile);
            Files.copy(Paths.get(outputFile.getPath()), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return true;
        } catch (Exception ex) {
            throw new IOException("Could not store file" + fileName + ". Please try again!", ex);
        } finally {
            if (inputStream != null) inputStream.close();

            if (outputFile != null)
                FileUtils.delete(outputFile);
        }
    }

    public File getFile(Person_Image personImage) throws IOException {
        File outputFile = null;
        FileInputStream inputStream = null;
        try {
            init();
            Path targetLocation = Paths.get(REPOSITORY_URL + personImage.getFileName()).toAbsolutePath().normalize();
            outputFile = File.createTempFile("temp", "." + personImage.getType());
            if(!targetLocation.toFile().exists())
                return null;
            inputStream = new FileInputStream(targetLocation.toFile());
            aesEncryption.decryptFile(inputStream, outputFile);
        } catch (Exception e) {
            e.printStackTrace();
            throw new FileNotFoundException("File doesn't exist");
        } finally {
            if (inputStream != null) inputStream.close();

        }
        return outputFile;
    }
}
