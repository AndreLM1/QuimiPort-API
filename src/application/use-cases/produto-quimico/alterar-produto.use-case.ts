import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js";
import type { ProdutoQuimicoRepository } from "@/application/ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import type { InputAlterarProdutoQuimico } from "@/application/dtos/alterar-produto-quimico.dto.js"
import { NumeroOnu } from "@/domain/entities/numero-onu.js";



export class AlterarProdutoQuimicoUseCase {
    constructor(private readonly produtoQuimicoRepository: ProdutoQuimicoRepository) { }

    async execute(id: number, input: InputAlterarProdutoQuimico): Promise<ProdutoQuimico> {
        // Buscar Produto
        // Método findById retorna uma Promise que, quando resolvida, fornece um ProdutoQuimico.
        const produtoEncontrado = await this.produtoQuimicoRepository.findById(id);
        //  Lança exception se não encontrar o produto
        if (!produtoEncontrado) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado`
            }, "ResourceNotFoundError");
        };

        // Converter o numero onu do json em uma instância da classe
        const numeroOnu = new NumeroOnu(input.numeroOnu)

        // Como o resultado do método findById é um prduto químico, posso chamar o método da classe.
        produtoEncontrado.alterarDados(input.nome,
            numeroOnu,
            input.classeRisco,
            input.descricao,
            input.grupoCompatibilidade)

        const produtoAlterado = await this.produtoQuimicoRepository.alterar(produtoEncontrado);

        if (!produtoAlterado) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado durante a alteração`
            }, "ResourceNotFoundError");
        }

        return produtoAlterado;
    }
}