import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
export class ListarProdutoQuimicoUseCase {
    produtoQuimicoRepository;
    constructor(produtoQuimicoRepository) {
        this.produtoQuimicoRepository = produtoQuimicoRepository;
    }
    async execute() {
        return await this.produtoQuimicoRepository.findAll();
    }
}
//# sourceMappingURL=listar-produto.use-case.js.map