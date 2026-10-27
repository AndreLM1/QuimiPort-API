import type { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";

export interface ProdutoQuimicoRepository{
    // Método para buscar por ID
    findById(id: number): Promise<ProdutoQuimico | undefined>;
    registrar(produtoQuimico: ProdutoQuimico): Promise<ProdutoQuimico>;
    findAll(): Promise<ProdutoQuimico[]>
}