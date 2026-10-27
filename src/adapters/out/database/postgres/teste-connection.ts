import { DatabaseConnection  } from "./database.js";

try {
    const result = await DatabaseConnection.query("SELECT NOW() AS horario");

    console.log("Conexão com PostgreSQL estabelecida!");
    console.log("Horário retornado pelo banco:", result.rows[0].horario);
} catch (error) {
    console.error("Falha ao conectar com PostgreSQL:", error);
    process.exitCode = 1;
} finally {
    await DatabaseConnection .end();
}
