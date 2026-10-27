
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js";
import { jest } from "@jest/globals";

export const findByIdMock = jest.fn<ProdutoQuimicoRepository["findById"]>()
    .mockResolvedValue(undefined);

export const registrarMock = jest.fn<ProdutoQuimicoRepository["registrar"]>()

export const findAllMock = jest.fn<ProdutoQuimicoRepository["findAll"]>()


export const produtoQuimicoRepositoryMock: ProdutoQuimicoRepository = {
    findById: findByIdMock,
    registrar: registrarMock,
    findAll: findAllMock
};
