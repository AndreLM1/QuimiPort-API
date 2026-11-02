import { describe, it, expect } from "@jest/globals";
import { ProdutoQuimico } from "../entities/produto-quimico.js";
import { NumeroOnu } from "../entities/numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { StatusProduto } from "../enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
import { DomainValidationError } from "../errors/domain-validation.error.js";
describe('Validation Product Error', () => {
    // Teste Unitário para cadastrar sem Nome     
    it('Devera impedir a criacao de um produto quimico sem nome', () => {
        let excecaoLancada = false;
        // Tenta criar o produto.
        // Se ocorrer uma exceção, verifique seu tipo e a mensagem da violação.
        try {
            new ProdutoQuimico("", new NumeroOnu("1234"), "Gasolina", ClasseRisco.Classe1, StatusProduto.Ativo, GrupoCompatibilidade.a);
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true; // Se a excecao for lancada
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Produto deve conter um nome");
                }
            }
            // expect(error.violations[0].message).toBe("Produto deve conter um nome")
        }
        // Se nenhuma exceção ocorrer, faça o teste falhar explicitamente.
        // Se nenhuma exceção for lançada, a variável continuará false e o teste falhará.
        expect(excecaoLancada).toBe(true);
        ;
    });
    // Teste unitário impedir a criação de um produto químico sem classe de risco
    it('Deverá impedir a criação de um produto químico sem classe de risco', () => {
        try {
            new ProdutoQuimico("Produto", new NumeroOnu("1234"), "Gasolina", undefined, StatusProduto.Ativo, GrupoCompatibilidade.a);
            throw new Error("Era esperado um erro de validação");
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            if (error instanceof DomainValidationError) {
                expect(error.violations[0]?.message)
                    .toBe("Classe de Risco Inválida");
            }
        }
    });
    it("Deverá inativar um produto químico ativo", () => {
        const produto = new ProdutoQuimico("Gasolina", new NumeroOnu("1203"), "Combustível líquido e inflamável", ClasseRisco.Classe1, StatusProduto.Ativo, GrupoCompatibilidade.a);
        produto.inativar();
        expect(produto.statusProduto).toBe(StatusProduto.Inativo);
    });
    it("Deverá manter inativo um produto químico que já esteja inativo", () => {
        const produto = new ProdutoQuimico("Gasolina", new NumeroOnu("1203"), "Combustível líquido e inflamável", ClasseRisco.Classe1, StatusProduto.Ativo, GrupoCompatibilidade.a);
        produto.inativar();
        expect(produto.statusProduto).toBe(StatusProduto.Inativo);
        produto.inativar();
        expect(produto.statusProduto).toBe(StatusProduto.Inativo);
    });
});
//# sourceMappingURL=produto-quimico.test.js.map