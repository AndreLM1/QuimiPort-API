import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js";
import type { ProdutoQuimicoRepository } from "@/application/ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import { StatusProduto } from "@/domain/enums/status-produto.enum.js"


export class InativarProdutoQuimicoUseCase {
    constructor(private readonly produtoQuimicoRepository: ProdutoQuimicoRepository) { }

    async execute(id: number): Promise<ProdutoQuimico> {

        const produto = await this.produtoQuimicoRepository.findById(id);

        if (!produto) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado`
            }, "ResourceNotFoundError");
        };

        if (produto.statusProduto === StatusProduto.Inativo) {
            return produto;
        }

        const produtoInativo = await this.produtoQuimicoRepository.inativar(id)
        if (!produtoInativo) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado durante a inativação`
            }, "ResourceNotFoundError");
        }

        return produtoInativo;
    }
}