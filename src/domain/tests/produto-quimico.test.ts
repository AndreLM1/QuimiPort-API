import { describe, it, expect } from "@jest/globals"
import { ProdutoQuimico } from "../entities/produto-quimico.js"
import { NumeroOnu } from "../entities/numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { StatusProduto } from "../enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
import { DomainValidationError } from "../errors/domain-validation.error.js"


describe('Validation Product Error', () => {
    // Teste Unitário para cadastrar sem Nome     
    it('Devera impedir a criacao de um produto quimico sem nome', () => {
        let excecaoLancada = false;
        // Tenta criar o produto.
        // Se ocorrer uma exceção, verifique seu tipo e a mensagem da violação.
        try {
            new ProdutoQuimico(1,"", new NumeroOnu("1234"), "Gasolina", ClasseRisco.Classe1, StatusProduto.Ativo, new Date('2026-10-13'), GrupoCompatibilidade.a);
        } catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError)
            excecaoLancada = true; // Se a excecao for lancada
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];

                expect(primeiraViolacao).toBeDefined();

                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe(
                        "Produto deve conter um nome"
                    );
                }
            }
            // expect(error.violations[0].message).toBe("Produto deve conter um nome")
            
        }

        // Se nenhuma exceção ocorrer, faça o teste falhar explicitamente.
        // Se nenhuma exceção for lançada, a variável continuará false e o teste falhará.
        expect(excecaoLancada).toBe(true);;
    });

    // Teste Unitário para cadastrar sem Classe de Risco
    it('Devera impedir a criacao de um produto quimico sem classe de risco', ()=>{
        let excecaoLancada = false;

        try{
            new ProdutoQuimico(1,"Produto", new NumeroOnu("1234"), "Gasolina", undefined as unknown as ClasseRisco ,StatusProduto.Ativo, new Date('2026-10-13'), GrupoCompatibilidade.a);
        } catch(error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];

                expect(primeiraViolacao).toBeDefined();

                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe(
                        "Classe de Risco Inválida"
                    );
                }
            }
            // expect(error.violations[0].message).toBe("Produto deve conter classe de risco")
        }

        expect(excecaoLancada).toBe(true);;
    })

    // Teste Unitário para cadastrar com classe de risco inválida
    it('Devera impedir a criacao de um produto com classe de risco inválida', ()=>{
        let excecaoLancada = false;

        try{
            new ProdutoQuimico(1,"Produto", new NumeroOnu("1234"), "Gasolina", undefined as unknown as ClasseRisco, StatusProduto.Ativo, new Date('2026-10-13'), GrupoCompatibilidade.b);
        } catch(error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];

                expect(primeiraViolacao).toBeDefined();

                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe(
                        "Classe de Risco Inválida"
                    );
                }
            }
            // expect(error.violations[0].message).toBe("Classe de Risco Inválida")
        }

        expect(excecaoLancada).toBe(true);
    })


    // Teste Unitário para cadastrar com status inativo
    it('Devera impedir a criacao de um produto com status inativo', ()=> {
        let excecaoLancada = false;

        try{
            new ProdutoQuimico(1,"Produto", new NumeroOnu("1234"), "Gasolina", ClasseRisco.Classe1, StatusProduto.Inativo, new Date('2026-10-13'), GrupoCompatibilidade.a);
        } catch(error){
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];

                expect(primeiraViolacao).toBeDefined();

                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe(
                        "Produto não pode ser cadastrado com o status Inativo"
                    );
                }
            }
            // expect(error.violations[0].message).toBe("Produto não pode ser cadastrado com o status Inativo")
        }

        expect(excecaoLancada).toBe(true);
    })

    // // Teste Unitário para impedir a associacao de um produto inativo à uma nova carga química
    // it('Devera impedir a associacao de um produto inativo à uma nova carga química', ()=>{
        
    // })
})
