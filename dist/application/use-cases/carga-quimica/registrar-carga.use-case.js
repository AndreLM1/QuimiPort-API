import { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
import { StatusProduto } from "../../../domain/enums/status-produto.enum.js";
import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
import { DomainValidationError } from "../../../domain/errors/domain-validation.error.js";
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
            throw new ResourceNotFoundError({
                code: "PRODUTO_QUIMICO_NAO_ENCONTRADO",
                field: "id",
                message: `Produto químico com ID ${input.produtoQuimicoId} não encontrado`
            }, "ResourceNotFoundError");
        }
        ;
        if (produtoQuimico.statusProduto !== StatusProduto.Ativo) {
            throw new DomainValidationError([{
                    code: "PRODUTO_QUIMICO_INATIVO",
                    field: "statusProduto",
                    message: "Não é permitido registrar uma carga com um produto químico inativo"
                }], "Não foi possível registrar a carga química");
        }
        // Instanciando uma Carga Química
        const cargaQuimica = new CargaQuimica(input.codigoCarga, input.produtoQuimicoId, input.quantidade, input.unidadeMedida, input.origem, input.destino, input.responsavelTecnico, input.documentoObrigatorio);
        const persistirCarga = await this.cargaQuimicaRepository.registrar(cargaQuimica);
        return persistirCarga;
    }
}
//# sourceMappingURL=registrar-carga.use-case.js.map