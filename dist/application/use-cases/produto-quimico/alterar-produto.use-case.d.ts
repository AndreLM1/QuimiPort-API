import type { ProdutoQuimicoRepository } from "../../ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
import type { InputAlterarProdutoQuimico } from "../../dtos/alterar-produto-quimico.dto.js";
export declare class AlterarProdutoQuimicoUseCase {
    private readonly produtoQuimicoRepository;
    constructor(produtoQuimicoRepository: ProdutoQuimicoRepository);
    execute(id: number, input: InputAlterarProdutoQuimico): Promise<ProdutoQuimico>;
}
//# sourceMappingURL=alterar-produto.use-case.d.ts.map