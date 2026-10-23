import { jest } from "@jest/globals";
export const findByIdMock = jest.fn()
    .mockResolvedValue(undefined);
export const produtoQuimicoRepositoryMock = {
    findById: findByIdMock
};
//# sourceMappingURL=produto-quimico-repository.mock.js.map