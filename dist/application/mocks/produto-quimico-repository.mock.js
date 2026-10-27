import { ProdutoQuimico } from "../../domain/entities/produto-quimico.js";
import { jest } from "@jest/globals";
export const findByIdMock = jest.fn()
    .mockResolvedValue(undefined);
export const registrarMock = jest.fn();
export const findAllMock = jest.fn();
export const inativarMock = jest.fn();
export const produtoQuimicoRepositoryMock = {
    findById: findByIdMock,
    registrar: registrarMock,
    findAll: findAllMock,
    inativar: inativarMock
};
//# sourceMappingURL=produto-quimico-repository.mock.js.map