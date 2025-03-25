package com.capa.banking_api.service.Impl;

import com.capa.banking_api.entity.Client;
import com.capa.banking_api.respository.ClientRepository;
import com.capa.banking_api.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements IClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> findAll() {
        return (List<Client>) clientRepository.findAll();
    }
}
