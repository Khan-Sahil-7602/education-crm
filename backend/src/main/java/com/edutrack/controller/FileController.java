package com.edutrack.controller;

import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {

  private final FileService fileService;

  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @GetMapping("/{folderName}/{filename}")
  public ResponseEntity<Resource> getFile(@PathVariable String folderName, @PathVariable String filename) {

    try {
      Path path = fileService.getFilePath(folderName, filename);

      Resource resource = new UrlResource(path.toUri());

      if (!resource.exists()) {
        return ResponseEntity.notFound().build();
      }

      String contentType = Files.probeContentType(path);

      if (contentType == null) {
        contentType = "application/octet-stream";
      }

      return ResponseEntity.ok()
          .contentType(MediaType.parseMediaType(contentType))
          .body(resource);

    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }
}
