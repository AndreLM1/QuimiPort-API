import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { cargaQuimicaRepositoryMock, findByIdMock, atualizarStatusMock } from "../../mocks/carga-quimica-repository.mock.js";
import { UnidadeDeMedida } from "../../../domain/enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "../../../domain/entities/documentoObrigatorio.js";
import { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
import { StatusCargaQuimica } from "../../../domain/enums/status-carga-quimica.enum.js";
import { CancelarCargaQuimicaUseCase } from "../carga-quimica/cancelar-carga.use-case.js";
describe("Validation Cancelar Carga Química Use Case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it.each([StatusCargaQuimica.Registrada,
        StatusCargaQuimica.Analise,
        StatusCargaQuimica.Inspecao,
        StatusCargaQuimica.Liberada,
        StatusCargaQuimica.Bloqueada,
        StatusCargaQuimica.Movimentacao])("Deve permitir o cancelamento de uma Carga Química que esteja %s", async (statusCarga) => {
        const cargaId = 1;
        const carga = new CargaQuimica("TESTE 01", 1, 10, UnidadeDeMedida.kg, "Brasil", "USA", "André Marques", new DocumentoObrigatorio(12345, true, true, true), new Date(2026, 11, 2), new Date(2026, 11, 2), new Date(2026, 11, 2), cargaId, statusCarga);
        findByIdMock.mockResolvedValue(carga);
        const useCase = new CancelarCargaQuimicaUseCase(cargaQuimicaRepositoryMock);
        await expect(useCase.execute(cargaId))
            .resolves.toBeInstanceOf(CargaQuimica);
        expect(carga.statusCarga).toBe(StatusCargaQuimica.Cancelada);
        expect(atualizarStatusMock).toHaveBeenCalledTimes(1);
    });
    it("Deve impedir o cancelamento de uma Carga Química que esteja finalizada", async () => {
        const cargaId = 1;
        const carga = new CargaQuimica("TESTE 01", 1, 10, UnidadeDeMedida.kg, "Brasil", "USA", "André Marques", new DocumentoObrigatorio(12345, true, true, true), new Date(2026, 11, 2), new Date(2026, 11, 2), new Date(2026, 11, 2), cargaId, StatusCargaQuimica.Finalizada);
        findByIdMock.mockResolvedValue(carga);
        const useCase = new CancelarCargaQuimicaUseCase(cargaQuimicaRepositoryMock);
        await expect(useCase.execute(cargaId)).rejects.toThrow("Operação Não Permitida");
        expect(carga.statusCarga).toBe(StatusCargaQuimica.Finalizada);
        expect(atualizarStatusMock).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=cancelar-carga.use-case.test.js.map