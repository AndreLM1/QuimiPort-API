import { jest } from "@jest/globals";
import type { CargaQuimicaRepository } from "../ports/out/carga-quimica-repository.js";

export const registrarMock = jest.fn<CargaQuimicaRepository["registrar"]>()
    .mockImplementation(async (cargaQuimica) => {
        return cargaQuimica
    });

export const findAllMock = jest.fn<CargaQuimicaRepository["findAll"]>()
export const findByIdMock = jest.fn<CargaQuimicaRepository["findById"]>()
export const alterarMock = jest.fn<CargaQuimicaRepository["atualizar"]>()
export const atualizarStatusMock = jest.fn<CargaQuimicaRepository["atualizarStatus"]>()


export const cargaQuimicaRepositoryMock: CargaQuimicaRepository = {
    registrar: registrarMock,
    findAll: findAllMock,
    findById: findByIdMock,
    atualizar: alterarMock,
    atualizarStatus: atualizarStatusMock

}  