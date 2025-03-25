package com.capa.banking_api.controller;

import com.capa.banking_api.entity.Client;
import com.capa.banking_api.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private IClientService iClientService;

    @GetMapping("/all")
    public ResponseEntity<?> findById() {
        return ResponseEntity.ok(iClientService.findAll());
    }
}
