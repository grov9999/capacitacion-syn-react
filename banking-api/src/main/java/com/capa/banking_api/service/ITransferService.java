package com.capa.banking_api.service;

import com.capa.banking_api.entity.Transfer;

import java.util.List;

public interface ITransferService {

    List<Transfer> findAll();
    Transfer findById(Long id);
    void save(Transfer transfer);
    boolean deleteById(Long id);
    Transfer update(Long id, Transfer transfer);
}
