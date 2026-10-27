import type { ProdutoQuimicoRepository } from "../../../../application/ports/out/produto-quimico-repository.js";
import type { DatabaseConnection } from "../postgres/database.js";
import { ProdutoQuimico } from "../../../../domain/entities/produto-quimico.js";
export declare class ProdutoQuimicoSqlRepository implements ProdutoQuimicoRepository {
    private readonly db;
    constructor(db: typeof DatabaseConnection);
    findById(id: number): Promise<ProdutoQuimico | undefined>;
    registrar(produtoQuimico: ProdutoQuimico): Promise<ProdutoQuimico>;
    findAll(): Promise<ProdutoQuimico[]>;
}
//# sourceMappingURL=produto-quimico.repository.d.ts.map