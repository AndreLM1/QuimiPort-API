import { ProdutoQuimico } from "../../domain/entities/produto-quimico.js";
import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js";
export declare const findByIdMock: import("jest-mock").Mock<(id: number) => Promise<ProdutoQuimico | undefined>>;
export declare const registrarMock: import("jest-mock").Mock<(produtoQuimico: ProdutoQuimico) => Promise<ProdutoQuimico>>;
export declare const findAllMock: import("jest-mock").Mock<() => Promise<ProdutoQuimico[]>>;
export declare const inativarMock: import("jest-mock").Mock<(id: number) => Promise<ProdutoQuimico | undefined>>;
export declare const alterarMock: import("jest-mock").Mock<(produtoQuimico: ProdutoQuimico) => Promise<ProdutoQuimico | undefined>>;
export declare const produtoQuimicoRepositoryMock: ProdutoQuimicoRepository;
//# sourceMappingURL=produto-quimico-repository.mock.d.ts.map