import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
import { NumeroOnu } from "../../../domain/entities/numero-onu.js";
export class AlterarProdutoQuimicoUseCase {
    produtoQuimicoRepository;
    constructor(produtoQuimicoRepository) {
        this.produtoQuimicoRepository = produtoQuimicoRepository;
    }
    async execute(id, input) {
        // Buscar Produto
        // Método findById retorna uma Promise que, quando resolvida, fornece um ProdutoQuimico.
        const produtoEncontrado = await this.produtoQuimicoRepository.findById(id);
        //  Lança exception se não encontrar o produto
        if (!produtoEncontrado) {
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id", message: `Produto químico com ID ${id} não encontrado`
            }, "ResourceNotFoundError");
        }
        ;
        // Converter o numero onu do json em uma instância da classe
        const numeroOnu = new NumeroOnu(input.numeroOnu);
        // Como o resultado do método findById é um prduto químico, posso chamar o método da classe.
        produtoEncontrado.alterarDados(input.nome, numeroOnu, input.classeRisco, input.descricao, input.grupoCompatibilidade);
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
//# sourceMappingURL=alterar-produto.use-case.js.map