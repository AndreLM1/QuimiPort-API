import { describe, it, expect } from "@jest/globals";
import fastify from "fastify";
import { registerErrorHandler } from "./error-handler.js";
import { DomainValidationError } from "../../../domain/errors/domain-validation.error.js";
describe('Error Handler', () => {
    it('deve retornar 400 para erros de validação de domínio', async () => {
        const app = fastify();
        registerErrorHandler(app);
        app.get('/teste', () => {
            throw new DomainValidationError([
                {
                    code: 'REQUIRED_FIELD',
                    field: 'nome',
                    message: 'O nome é obrigatório',
                },
            ], 'O produto possui dados inválidos');
        });
        const response = await app.inject({
            method: 'GET',
            url: '/teste',
        });
        expect(response.statusCode).toBe(400);
        expect(response.json().error).toBe('DomainValidationError');
        expect(response.json().violations).toHaveLength(1);
        await app.close();
    });
    it('deve retornar 500 para erros genéricos', async () => {
        const app = fastify();
        registerErrorHandler(app);
        app.get("/error", (request, reply) => {
            throw new Error("Mensagem confidencial");
        });
        const response = await app.inject({
            method: 'GET',
            url: '/error',
        });
        expect(response.statusCode).toBe(500);
        expect(response.json().error).toBe("Internal Server Error");
        expect(response.body).not.toContain('Mensagem confidencial');
        await app.close();
    });
});
//# sourceMappingURL=error-handler.test.js.map