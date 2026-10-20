import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js";
import { jest } from "@jest/globals";

export const produtoQuimicoRepositoryMock: ProdutoQuimicoRepository = {
    findById: jest.fn<ProdutoQuimicoRepository["findById"]>().mockResolvedValue(undefined)
}