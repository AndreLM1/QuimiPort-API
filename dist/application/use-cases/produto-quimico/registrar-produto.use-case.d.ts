import type { ProdutoQuimicoRepository } from "../../ports/out/produto-quimico-repository.js";
import type { InputRegistrarProdutoQuimicoDto } from "../../dtos/registrar-produto-quimico.dto.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export declare class RegistrarProdutoQuimicoUseCase {
    private produtoQuimicoRepository;
    constructor(produtoQuimicoRepository: ProdutoQuimicoRepository);
    execute(input: InputRegistrarProdutoQuimicoDto): Promise<ProdutoQuimico>;
}
//# sourceMappingURL=registrar-produto.use-case.d.ts.map