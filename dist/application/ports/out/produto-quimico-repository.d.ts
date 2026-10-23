import type { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export interface ProdutoQuimicoRepository {
    findById(id: number): Promise<ProdutoQuimico | undefined>;
}
//# sourceMappingURL=produto-quimico-repository.d.ts.map