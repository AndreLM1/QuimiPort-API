import type { ProdutoQuimicoRepository } from "@/application/ports/out/produto-quimico-repository.js";
import type { InputRegistrarProdutoQuimicoDto } from "@/application/dtos/registrar-produto-quimico.dto.js"
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import { NumeroOnu } from "@/domain/entities/numero-onu.js";

export class RegistrarProdutoQuimicoUseCase {
    constructor(private produtoQuimicoRepository: ProdutoQuimicoRepository) { }

    async execute(input: InputRegistrarProdutoQuimicoDto): Promise<ProdutoQuimico> {

        const numeroOnu = new NumeroOnu(input.numeroOnu)

        const produtoQuimico = new ProdutoQuimico(
            input.nome,
            numeroOnu,
            input.descricao,
            input.classeRisco,
            input.statusProduto,
            input.grupoCompatibilidade
        )

        const persistirProduto = await this.produtoQuimicoRepository.registrar(produtoQuimico)

        return persistirProduto;
    }
}