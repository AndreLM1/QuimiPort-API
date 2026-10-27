import { produtoQuimicoRepositoryMock } from "../../mocks/produto-quimico-repository.mock.js";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { RegistrarProdutoQuimicoUseCase } from "../produto-quimico/registrar-produto.use-case.js";
import { NumeroOnu } from "../../../domain/entities/numero-onu.js";
import { ClasseRisco } from "../../../domain/enums/classe-de-risco.enum.js";
import { StatusProduto } from "../../../domain/enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../../../domain/enums/grupo-compatibilidade.enum.js";
import { exec } from "node:child_process";
import { DomainValidationError } from "../../../domain/errors/domain-validation.error.js";
describe("Validation Registrar Produto Quimico Use Case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Deve lançar erro ao cadastrar produto sem nome', async () => {
        // produtoQuimicoRepositoryMock.registrar
        const useCase = new RegistrarProdutoQuimicoUseCase(produtoQuimicoRepositoryMock);
        const input = {
            nome: "",
            numeroOnu: "1234",
            descricao: "Produto Teste",
            classeRisco: ClasseRisco.Classe1,
            statusProduto: StatusProduto.Ativo,
            grupoCompatibilidade: GrupoCompatibilidade.a,
        };
        try {
            await useCase.execute(input);
            throw new Error("Era esperado que o cadastro fosse rejeitado");
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            if (error instanceof DomainValidationError) {
                expect(error.message).toBe("O produto possui dados inválidos");
                expect(error.violations[0]?.message).toBe("Produto deve conter um nome");
            }
        }
        expect(produtoQuimicoRepositoryMock.registrar).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=registrar-produto.use-case.test.js.map