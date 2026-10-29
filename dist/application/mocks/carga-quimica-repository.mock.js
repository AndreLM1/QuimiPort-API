import { jest } from "@jest/globals";
export const registrarMock = jest.fn()
    .mockImplementation(async (cargaQuimica) => {
    return cargaQuimica;
});
export const findAllMock = jest.fn();
export const findByIdMock = jest.fn();
export const alterarMock = jest.fn();
export const atualizarStatusMock = jest.fn();
export const cargaQuimicaRepositoryMock = {
    registrar: registrarMock,
    findAll: findAllMock,
    findById: findByIdMock,
    atualizar: alterarMock,
    atualizarStatus: atualizarStatusMock
};
//# sourceMappingURL=carga-quimica-repository.mock.js.map