CREATE DATABASE IF NOT EXISTS psicologo_db;
USE psicologo_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    nivel_enamoramiento INT,
    nivel_negacion INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    rol ENUM('usuario', 'psicologo', 'gamificador'),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);