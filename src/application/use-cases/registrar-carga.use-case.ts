import type { InputRegistrarCargaQuimica } from "../dtos/registrar-carga-quimica.dto.js";
import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js"

export class RegistrarCargaQuimicaUseCase{
    constructor(private produtoQuimicoRepository: ProdutoQuimicoRepository){}

    async execute(input: InputRegistrarCargaQuimica): Promise<>
}