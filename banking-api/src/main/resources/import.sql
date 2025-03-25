INSERT INTO clientes (client_dni, client_name) VALUES ('Juan Pérez', '12345678901');
INSERT INTO clientes (client_dni, client_name) VALUES ('María López', '09876543212');
INSERT INTO clientes (client_dni, client_name) VALUES ('Carlos Gómez', '45678901234');
INSERT INTO clientes (client_dni, client_name) VALUES ('Ana Torres', '78901234567');
INSERT INTO clientes (client_dni, client_name) VALUES ('Luis Fernández', '11223344556');

INSERT INTO transferencias (descripcion, destino, monto, origen, tiempo) VALUES ('1234567890', '0987654321', '500.00', 'Pago de servicios', '2025-03-23 18:30:00');
INSERT INTO transferencias (descripcion, destino, monto, origen, tiempo) VALUES ('0987654321', '1122334455', '200.00', 'Reembolso de compra', '2025-03-23 19:00:00');
INSERT INTO transferencias (descripcion, destino, monto, origen, tiempo) VALUES ('1234567890', '1122334455', '300.00', 'Préstamo a amigo', '2025-03-23 20:15:00');
