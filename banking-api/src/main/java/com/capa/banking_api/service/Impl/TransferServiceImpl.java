package com.capa.banking_api.service.Impl;

import com.capa.banking_api.entity.Transfer;
import com.capa.banking_api.respository.TransferRepository;
import com.capa.banking_api.service.ITransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferServiceImpl implements ITransferService {

    @Autowired
    private TransferRepository transferRepository;

    @Override
    public List<Transfer> findAll(){
        return (List<Transfer>) transferRepository.findAll();
    }

    @Override
    public Transfer findById(Long id) {
        return transferRepository.findById(id).orElseThrow();
    }

    @Override
    public void save(Transfer transfer) {
        transferRepository.save(transfer);
    }

    @Override
    public boolean deleteById(Long id) {
        if (transferRepository.existsById(id)) {
            transferRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
