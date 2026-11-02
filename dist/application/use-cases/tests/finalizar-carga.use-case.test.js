import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { cargaQuimicaRepositoryMock, findByIdMock, atualizarStatusMock } from "../../mocks/carga-quimica-repository.mock.js";
import { UnidadeDeMedida } from "../../../domain/enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "../../../domain/entities/documentoObrigatorio.js";
import { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
import { StatusCargaQuimica } from "../../../domain/enums/status-carga-quimica.enum.js";
import { FinalizarCargaQuimicaUseCase } from "../carga-quimica/finalizar-carga.use-case.js";
describe("Validation Finalizar Carga Química Use Case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Deve permitir a finalização de uma Carga Química em movimentação", async () => {
        const cargaId = 1;
        const carga = new CargaQuimica("TESTE 01", 1, 10, UnidadeDeMedida.kg, "Brasil", "USA", "André Marques", new DocumentoObrigatorio(12345, true, true, true), new Date(2026, 11, 2), new Date(2026, 11, 2), new Date(2026, 11, 2), cargaId, StatusCargaQuimica.Movimentacao);
        findByIdMock.mockResolvedValue(carga);
        const useCase = new FinalizarCargaQuimicaUseCase(cargaQuimicaRepositoryMock);
        await expect(useCase.execute(cargaId))
            .resolves.toBeInstanceOf(CargaQuimica);
        expect(carga.statusCarga).toBe(StatusCargaQuimica.Finalizada);
        expect(atualizarStatusMock).toHaveBeenCalledTimes(1);
    });
    it.each([StatusCargaQuimica.Registrada,
        StatusCargaQuimica.Bloqueada,
        StatusCargaQuimica.Cancelada,
        StatusCargaQuimica.Finalizada,
        StatusCargaQuimica.Analise,
        StatusCargaQuimica.Inspecao])("Deve impedir a finalização de uma Carga Química que esteja %s", async (statusCarga) => {
        const cargaId = 1;
        const carga = new CargaQuimica("TESTE 01", 1, 10, UnidadeDeMedida.kg, "Brasil", "USA", "André Marques", new DocumentoObrigatorio(12345, true, true, true), new Date(2026, 11, 2), new Date(2026, 11, 2), new Date(2026, 11, 2), cargaId, statusCarga);
        findByIdMock.mockResolvedValue(carga);
        const useCase = new FinalizarCargaQuimicaUseCase(cargaQuimicaRepositoryMock);
        await expect(useCase.execute(cargaId)).rejects.toThrow("Operação Não Permitida");
        expect(carga.statusCarga).toBe(statusCarga);
        expect(atualizarStatusMock).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=finalizar-carga.use-case.test.js.map