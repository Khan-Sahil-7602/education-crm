package com.edutrack.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

  @Value("${file.upload-dir}")
  private String uploadDir;

  public Path getFilePath(String folderName, String filename) {

    Path path = Paths.get(uploadDir, folderName)
        .toAbsolutePath()
        .normalize()
        .resolve(filename)
        .normalize();

    if (!path.startsWith(
        Paths.get(uploadDir, folderName)
            .toAbsolutePath()
            .normalize())) {

      throw new RuntimeException(
          "Invalid file path");
    }

    return path;
  }

  public String uploadFile(MultipartFile file, String folderName) throws IOException {

    Path uploadPath = Paths.get(uploadDir, folderName)
        .toAbsolutePath()
        .normalize();

    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    String originalName = file.getOriginalFilename();

    originalName = originalName.replaceAll("\\s+", "_");

    String uniqueFileName = UUID.randomUUID() + "_" + originalName;

    Path targetLocation = uploadPath.resolve(uniqueFileName);

    Files.copy(
        file.getInputStream(),
        targetLocation,
        StandardCopyOption.REPLACE_EXISTING);

    return folderName + "/" + uniqueFileName;
  }
}
