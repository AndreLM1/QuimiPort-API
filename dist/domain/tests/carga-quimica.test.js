import { describe, it, expect } from "@jest/globals";
import { CargaQuimica } from "../entities/carga-quimica.js";
import { UnidadeDeMedida } from "../enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "../entities/documentoObrigatorio.js";
import { DomainValidationError } from "../errors/domain-validation.error.js";
import { StatusCargaQuimica } from "../enums/status-carga-quimica.enum.js";
describe("Validation Carga Quimica Error", () => {
    // Teste Unitário Sem produto químico
    it("Devera impedir o cadastro da carga química sem produto químico associado", () => {
        let excecaoLancada = false;
        try {
            new CargaQuimica("CQ-A24", NaN, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre Marques", new DocumentoObrigatorio(1234, true, true, false));
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Carga Química deve conter um Produto Químico associado");
                }
            }
        }
        ;
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário Produto Químico Inválido
    it("Devera impedir o cadastro da carga química produto químico inválido", () => {
        let excecaoLancada = false;
        try {
            new CargaQuimica("CQ-A24", 2.1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre Marques", new DocumentoObrigatorio(1234, true, true, false));
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Produto Químico ID inválido");
                }
            }
        }
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário Quantidade <= 0
    it("Devera impedir o cadastro da carga química com quantidade menor ou igual a 0", () => {
        let excecaoLancada = false;
        try {
            new CargaQuimica("CQ-A24", 1, -2, UnidadeDeMedida.kg, "China", "São Paulo", "Andre Marques", new DocumentoObrigatorio(1234, true, true, false));
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Carga Química deve conter quantidade maior que 0");
                }
            }
            // expect(error.violations[0].message).toBe("Carga Química deve conter quantidade maior que 0");
        }
        ;
        expect(excecaoLancada).toBe(true);
    });
    it("Devera impedir o cadastro da carga química sem responsável técnico associado", () => {
        let excecaoLancada = false;
        try {
            new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", " ", new DocumentoObrigatorio(1234, true, true, false));
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Carga Química deve conter um responsável técnico");
                }
            }
            // expect(error.violations[0].message).toBe("Carga Química deve conter um responsável técnico");
        }
        expect(excecaoLancada).toBe(true);
    });
    // --------- Teste Unitário Método Analisar ---------
    // Teste Unitário para impedir a Análise de um carga que não registrada
    it("Deverá impedir a análise de um carga que não registrada", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(0, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        try {
            novaCarga.analisar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Carga não está registrada");
                }
            }
            // expect(error.violations[0].message).toBe("Carga não está registrada");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Inspecao);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para analsiar a carga.
    it("Deverá permitir a análise de uma carga registrada", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        novaCarga.analisar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Analise);
    });
    // ---------------------------------------------------
    // --------- Teste Unitário Método Inspecionar ---------
    // Teste Unitário para impedir a Inspeção de um carga que não esteja em análise
    it("Deverá impedir a Inspeção de um carga que não esteja em análise", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(0, true, true, true));
        try {
            novaCarga.inspecionar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Carga não está na etapa de Análise");
                }
            }
            // expect(error.violations[0].message).toBe("Carga não está na etapa de Análise");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para cancelar a carga.
    it("Deverá permitir a Inspeção de um carga que esteja em análise", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Inspecao);
    });
    // ---------------------------------------------------
    // Teste Unitário para permitir o bloqueio de uma Carga em Inspeção
    it("Deverá bloquear uma carga que esteja na etapa de Inspeção", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(1234, true, true, false));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        novaCarga.bloquear();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Bloqueada);
    });
    // Teste Unitário para impedir o bloqueio de uma Carga que não esteja em Inspeção
    it("Deverá impedir o bloqueio caso a carga não esteja na etapada de Inspeção", () => {
        let excecaoLancada = false;
        try {
            const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(1234, true, true, false));
            novaCarga.bloquear();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Impossível bloquear, verifique o status atual da carga.");
                }
            }
            // expect(error.violations[0].message).toBe("Impossível bloquear, verifique o status atual da carga.");
        }
        expect(excecaoLancada).toBe(true);
    });
    // --------- Teste Unitário Método Liberar -----------
    // Teste Unitário para impedir a liberação de uma carga que não esteja em Inspeção
    it("Deverá impedir a liberação caso a carga não esteja na etapa de Inspeção", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(1234, true, true, true));
        try {
            novaCarga.liberar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Impossível liberar, verifique o status atual da carga.");
                }
            }
            // expect(error.violations[0].message).toBe("Impossível liberar, verifique o status atual da carga.");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para impedir a liberação de uma carga que não esteja com a documentação obrigatória.
    // it("Deverá impedir a liberação caso a carga não esteja com a documentação obrigatória", ()=>{
    //     let excecaoLancada = false;
    //     const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(0, true, true, true));            
    //     // Alterando o status para o teste
    //     novaCarga.analisar()
    //     novaCarga.inspecionar() 
    //     novaCarga.liberar()  
    //     try {
    //         novaCarga.liberar() 
    //     } catch (error) {
    //         expect(error).toBeInstanceOf(DomainValidationError);
    //         excecaoLancada = true;
    //         expect(error.violations[0].message).toBe("Impossível liberar, há documentos faltando");
    //     }
    //     expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada)
    //     expect(excecaoLancada).toBe(true);
    // })
    // Teste Unitário para liberar uma carga com a documentação obrigatória e estar na etapa de Inspeção
    it("Deverá liberar a carga que esteja com a documentação obrigatória e estar na etapa de Inspeção", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        novaCarga.liberar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Liberada);
    });
    // ---------------------------------------------------
    // --------- Teste Unitário Método Movimentar ---------
    // Teste Unitário para impedir a movimentação de uma carga que não esteja liberada
    it("Deverá impedir a movimentação de uma carga que não esteja com o status Liberada", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        try {
            novaCarga.movimentar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Impossível movimentar, a carga não está liberada");
                }
            }
            // expect(error.violations[0].message).toBe("Impossível movimentar, a carga não está liberada");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para movimentar uma carga liberada
    it("Deverá movimentar uma carga liberada", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        novaCarga.liberar();
        novaCarga.movimentar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Movimentacao);
    });
    // ----------------------------------------------
    // --------- Teste Unitário Método Finalizar ---------
    // Teste Unitário para impedir a Finalização de um carga que não esteja em movimentação
    it("Deverá impedir a finalização de uma carga que não esteja em movimentação", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(0, true, true, true));
        try {
            novaCarga.finalizar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Impossível finalizar, a carga não está em movimentação");
                }
            }
            // expect(error.violations[0].message).toBe("Impossível finalizar, a carga não está em movimentação");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para finalizar a carga.
    it("Deverá permitir a finalização de uma carga em movimento", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        novaCarga.liberar();
        novaCarga.movimentar();
        novaCarga.finalizar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Finalizada);
    });
    // ---------------------------------------------------
    // --------- Teste Unitário Método Cancelar ---------
    // Teste Unitário para impedir o Cancelamento de um carga que não esteja bloqueada
    it("Deverá impedir o cancelamento de uma carga que não esteja bloqueada", () => {
        let excecaoLancada = false;
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(0, true, true, true));
        try {
            novaCarga.cancelar();
        }
        catch (error) {
            expect(error).toBeInstanceOf(DomainValidationError);
            excecaoLancada = true;
            if (error instanceof DomainValidationError) {
                const primeiraViolacao = error.violations[0];
                expect(primeiraViolacao).toBeDefined();
                if (primeiraViolacao) {
                    expect(primeiraViolacao.message).toBe("Impossível cancelar, a carga não está bloqueada");
                }
            }
            // expect(error.violations[0].message).toBe("Impossível cancelar, a carga não está bloqueada");
        }
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Registrada);
        expect(excecaoLancada).toBe(true);
    });
    // Teste Unitário para cancelar a carga.
    it("Deverá permitir o cancelamento de uma carga bloqueada", () => {
        const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(20, true, true, true));
        // Alterando o status para o teste
        novaCarga.analisar();
        novaCarga.inspecionar();
        novaCarga.bloquear();
        novaCarga.cancelar();
        expect(novaCarga.statusCarga).toBe(StatusCargaQuimica.Cancelada);
    });
    // ---------------------------------------------------
});
//# sourceMappingURL=carga-quimica.test.js.map