package com.capa.banking_api.service;

import com.capa.banking_api.entity.Client;

import java.util.List;

public interface IClientService {

    List<Client> findAll();
}
