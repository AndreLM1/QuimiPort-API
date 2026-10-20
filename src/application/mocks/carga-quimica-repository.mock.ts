import { jest } from "@jest/globals";
import type { CargaQuimicaRepository } from "../ports/out/carga-quimica-repository.js";


export const cargaQuimicaRepositoryMock: CargaQuimicaRepository = {
    registrar: jest
        .fn<CargaQuimicaRepository["registrar"]>()
        .mockImplementation(async (cargaQuimica) => {
            return cargaQuimica
        })
}