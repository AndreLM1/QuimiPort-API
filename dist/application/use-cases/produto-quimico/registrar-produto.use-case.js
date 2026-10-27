import { ProdutoQuimico } from "../../../domain/entities/produto-quimico.js";
import { NumeroOnu } from "../../../domain/entities/numero-onu.js";
export class RegistrarProdutoQuimicoUseCase {
    produtoQuimicoRepository;
    constructor(produtoQuimicoRepository) {
        this.produtoQuimicoRepository = produtoQuimicoRepository;
    }
    async execute(input) {
        const numeroOnu = new NumeroOnu(input.numeroOnu);
        const produtoQuimico = new ProdutoQuimico(input.nome, numeroOnu, input.descricao, input.classeRisco, input.statusProduto, input.grupoCompatibilidade);
        const persistirProduto = await this.produtoQuimicoRepository.registrar(produtoQuimico);
        return persistirProduto;
    }
}
//# sourceMappingURL=registrar-produto.use-case.js.map