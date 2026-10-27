import type { ProdutoQuimicoRepository } from "../../ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export declare class ListarProdutoQuimicoUseCase {
    private readonly produtoQuimicoRepository;
    constructor(produtoQuimicoRepository: ProdutoQuimicoRepository);
    execute(): Promise<ProdutoQuimico[]>;
}
//# sourceMappingURL=listar-produto.use-case.d.ts.map