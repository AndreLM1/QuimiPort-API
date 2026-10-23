import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js";
import { jest } from "@jest/globals";

export const findByIdMock = jest.fn<ProdutoQuimicoRepository["findById"]>()
    .mockResolvedValue(undefined);

export const produtoQuimicoRepositoryMock: ProdutoQuimicoRepository = {
    findById: findByIdMock
};
