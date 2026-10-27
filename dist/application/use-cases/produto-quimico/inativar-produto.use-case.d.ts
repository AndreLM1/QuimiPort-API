import type { ProdutoQuimicoRepository } from "../../ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export declare class InativarProdutoQuimicoUseCase {
    private readonly produtoQuimicoRepository;
    constructor(produtoQuimicoRepository: ProdutoQuimicoRepository);
    execute(id: number): Promise<ProdutoQuimico>;
}
//# sourceMappingURL=inativar-produto.use-case.d.ts.map