import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export class BuscarProdutoQuimicoPorIdUseCase {
    produtoQuimicoRepository;
    constructor(produtoQuimicoRepository) {
        this.produtoQuimicoRepository = produtoQuimicoRepository;
    }
    async execute(id) {
        const produto = await this.produtoQuimicoRepository.findById(id);
        if (!produto) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado`
            }, "ResourceNotFoundError");
        }
        ;
        return produto;
    }
    ;
}
//# sourceMappingURL=listar-id-produto.use-case.js.map