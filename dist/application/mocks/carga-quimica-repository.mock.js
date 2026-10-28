import { jest } from "@jest/globals";
export const registrarMock = jest.fn()
    .mockImplementation(async (cargaQuimica) => {
    return cargaQuimica;
});
export const findAllMock = jest.fn();
export const cargaQuimicaRepositoryMock = {
    registrar: registrarMock,
    findAll: findAllMock
};
//# sourceMappingURL=carga-quimica-repository.mock.js.map