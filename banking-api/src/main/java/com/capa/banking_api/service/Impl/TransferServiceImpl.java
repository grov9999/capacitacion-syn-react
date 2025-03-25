package com.capa.banking_api.service.Impl;

import com.capa.banking_api.entity.Transfer;
import com.capa.banking_api.respository.TransferRepository;
import com.capa.banking_api.service.ITransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Transfer update(Long id, Transfer transfer) {
        // Busca la transferencia existente
        Optional<Transfer> existingTransfer = transferRepository.findById(id);
        if (existingTransfer.isPresent()) {
            Transfer transferUpdate = existingTransfer.get();
            // Actualiza los campos necesarios
            transferUpdate.setOrigen(transfer.getOrigen());
            transferUpdate.setDestino(transfer.getDestino());
            transferUpdate.setDescripcion(transfer.getDescripcion());
            transferUpdate.setTiempo(transfer.getTiempo());
            // Guarda y devuelve la transferencia actualizada
            return transferRepository.save(transferUpdate);
        }
        // Si no se encuentra, retorna null o lanza una excepción según tu manejo
        return null;
    }

}
