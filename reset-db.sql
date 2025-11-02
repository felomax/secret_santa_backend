-- Script para limpiar la base de datos
-- Ejecuta esto en tu cliente PostgreSQL (Railway, pgAdmin, etc.)

DROP TABLE IF EXISTS gifs CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Las tablas se recrearán automáticamente cuando reinicies el servidor
