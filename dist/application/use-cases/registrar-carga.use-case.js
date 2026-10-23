import { CargaQuimica } from "../../domain/entities/carga-quimica.js";
import { StatusProduto } from "../../domain/enums/status-produto.enum.js";
export class RegistrarCargaQuimicaUseCase {
    produtoQuimicoRepository;
    cargaQuimicaRepository;
    constructor(produtoQuimicoRepository, cargaQuimicaRepository) {
        this.produtoQuimicoRepository = produtoQuimicoRepository;
        this.cargaQuimicaRepository = cargaQuimicaRepository;
    }
    async execute(input) {
        // Buscar produto químico
        const produtoQuimico = await this.produtoQuimicoRepository.findById(input.produtoQuimicoId);
        if (!produtoQuimico) {
            throw new Error("Produto não encontrado");
        }
        ;
        if (produtoQuimico.statusProduto !== StatusProduto.Ativo) {
            throw new Error("Produto Químico inativo, não pode ser associado à uma Carga Química");
        }
        ;
        // Instanciando uma Carga Química
        const cargaQuimica = new CargaQuimica(input.codigoCarga, input.produtoQuimicoId, input.quantidade, input.unidadeMedida, input.origem, input.destino, input.responsavelTecnico, input.documentoObrigatorio);
        const persistirCarga = await this.cargaQuimicaRepository.registrar(cargaQuimica);
        return persistirCarga;
    }
}
//# sourceMappingURL=registrar-carga.use-case.js.map