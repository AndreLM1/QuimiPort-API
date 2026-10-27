import type { ProdutoQuimicoRepository } from "@/application/ports/out/produto-quimico-repository.js";
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";


export class ListarProdutoQuimicoUseCase {
    constructor(private readonly produtoQuimicoRepository: ProdutoQuimicoRepository) { }

    async execute(): Promise<ProdutoQuimico[]> {
        return  await this.produtoQuimicoRepository.findAll();        
    }
}