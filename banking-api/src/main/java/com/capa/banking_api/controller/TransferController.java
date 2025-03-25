package com.capa.banking_api.controller;

import com.capa.banking_api.entity.Transfer;
import com.capa.banking_api.service.ITransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfer")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "*")
public class TransferController {

    @Autowired
    private ITransferService iTransferService;

    @GetMapping("/all")
    public ResponseEntity<?> findById() {
        return ResponseEntity.ok(iTransferService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(iTransferService.findById(id));
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveTransfer(@RequestBody Transfer transfer) {
        iTransferService.save(transfer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        boolean isDeleted = iTransferService.deleteById(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTransfer(@PathVariable Long id, @RequestBody Transfer input) {
        Transfer updatedTransfer = iTransferService.update(id, input);
        if (updatedTransfer != null) {
            return ResponseEntity.ok(updatedTransfer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
