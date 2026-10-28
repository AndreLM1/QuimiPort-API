import type { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";

export interface ProdutoQuimicoRepository{
    // Método para buscar por ID
    findById(id: number): Promise<ProdutoQuimico | undefined>;
    registrar(produtoQuimico: ProdutoQuimico): Promise<ProdutoQuimico>;
    findAll(): Promise<ProdutoQuimico[]>;
    inativar(id: number): Promise<ProdutoQuimico | undefined>;
    alterar(produtoQuimico: ProdutoQuimico): Promise<ProdutoQuimico | undefined>;
}