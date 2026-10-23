import { jest } from "@jest/globals";
export const cargaQuimicaRepositoryMock = {
    registrar: jest
        .fn()
        .mockImplementation(async (cargaQuimica) => {
        return cargaQuimica;
    })
};
//# sourceMappingURL=carga-quimica-repository.mock.js.map