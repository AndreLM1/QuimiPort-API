import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { cargaQuimicaRepositoryMock, findByIdMock, atualizarStatusMock } from "@/application/mocks/carga-quimica-repository.mock.js";
import { UnidadeDeMedida } from "@/domain/enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "@/domain/entities/documentoObrigatorio.js";
import { CargaQuimica } from "@/domain/entities/carga-quimica.js";
import { StatusCargaQuimica } from "@/domain/enums/status-carga-quimica.enum.js";
import { AnalisarCargaQuimicaUseCase } from "../carga-quimica/analisar-carga.use-case.js";

describe("Validation Analisar Carga Química Use Case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Deve permitir a análise de uma Carga Química registrada", async () => {

        const cargaId = 1;

        const carga = new CargaQuimica(
            "TESTE 01",
            1,
            10,
            UnidadeDeMedida.kg,
            "Brasil",
            "USA",
            "André Marques",
            new DocumentoObrigatorio(12345, true, true, true),
            new Date(2026, 11, 2),
            new Date(2026, 11, 2),
            new Date(2026, 11, 2),
            cargaId
        );

        findByIdMock.mockResolvedValue(carga);

        const useCase = new AnalisarCargaQuimicaUseCase(
            cargaQuimicaRepositoryMock
        );

        await expect(useCase.execute(cargaId))
            .resolves.toBeInstanceOf(CargaQuimica);

        expect(carga.statusCarga).toBe(StatusCargaQuimica.Analise);

        expect(atualizarStatusMock).toHaveBeenCalledTimes(1);
    });
    it.each([StatusCargaQuimica.Inspecao,
    StatusCargaQuimica.Bloqueada,
    StatusCargaQuimica.Cancelada,
    StatusCargaQuimica.Finalizada,
    StatusCargaQuimica.Liberada,
    StatusCargaQuimica.Movimentacao])(
        "Deve impedir a análise de uma Carga Química que  esteja %s",
        async (statusCarga) => {

            const cargaId = 1;

            const carga = new CargaQuimica(
                "TESTE 01",
                1,
                10,
                UnidadeDeMedida.kg,
                "Brasil",
                "USA",
                "André Marques",
                new DocumentoObrigatorio(12345, true, true, true),
                new Date(2026, 11, 2),
                new Date(2026, 11, 2),
                new Date(2026, 11, 2),
                cargaId,
                statusCarga
            );

            findByIdMock.mockResolvedValue(carga);

            const useCase = new AnalisarCargaQuimicaUseCase(
                cargaQuimicaRepositoryMock
            );

            await expect(useCase.execute(cargaId)).rejects.toThrow("Operação Não Permitida");

            expect(carga.statusCarga).toBe(statusCarga);

            expect(atualizarStatusMock).not.toHaveBeenCalled();
        });
})