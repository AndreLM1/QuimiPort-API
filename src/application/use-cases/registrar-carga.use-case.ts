import { CargaQuimica } from "@/domain/entities/carga-quimica.js";
import type { InputRegistrarCargaQuimicaDto } from "../dtos/registrar-carga-quimica.dto.js";
import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js"
import type { CargaQuimicaRepository } from "../ports/out/carga-quimica-repository.js"
import { StatusProduto } from "@/domain/enums/status-produto.enum.js";

export class RegistrarCargaQuimicaUseCase{
    constructor(private produtoQuimicoRepository: ProdutoQuimicoRepository, private cargaQuimicaRepository: CargaQuimicaRepository){}

    async execute(input: InputRegistrarCargaQuimicaDto): Promise<CargaQuimica>{
        // Buscar produto químico
        const produtoQuimico = await this.produtoQuimicoRepository.findById(input.produtoQuimicoId);

        if(!produtoQuimico){
            throw new Error("Produto não encontrado");
        };

        if(produtoQuimico.statusProduto !== StatusProduto.Ativo){
            throw new Error("Produto Químico inativo, não pode ser associado à uma Carga Química");
        };
        
        // Instanciando uma Carga Química
        const cargaQuimica = new CargaQuimica(input.codigoCarga, input.produtoQuimicoId, input.quantidade, input.unidadeMedida, input.origem, input.destino ,input.responsavelTecnico, input.documentoObrigatorio)
        
        const persistirCarga = await this.cargaQuimicaRepository.registrar(cargaQuimica)

        return persistirCarga
    }
}