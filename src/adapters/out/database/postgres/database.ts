import "dotenv/config";
import { Pool } from "pg";

// Recupera uma variável de ambiente obrigatória.
// Se estiver ausente ou vazia, interrompe a inicialização com uma mensagem clara.
function requiredEnv(name: string ){
    const value = process.env[name];

    if(!value){
        throw new Error(`Variável de ambiente não definida: ${name}`);
    };

    return value;
};

// Cria Pool de conexão usando as variáveis do ambiente
export const pool = new Pool({
    user: requiredEnv("DATABASE_USER"),
    host: requiredEnv("DATABASE_HOST"),
    database: requiredEnv("DATABASE_NAME"),
    password: requiredEnv("DATABASE_PASSWORD"),
    port: Number(requiredEnv("DATABASE_PORT"))
})