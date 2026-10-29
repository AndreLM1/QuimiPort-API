import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
export class AtualizaCargaQuimicaUseCase {
    cargaQuimicaRepository;
    constructor(cargaQuimicaRepository) {
        this.cargaQuimicaRepository = cargaQuimicaRepository;
    }
    async execute(id, input) {
        const cargaEncontrada = await this.cargaQuimicaRepository.findById(id);
        if (!cargaEncontrada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        }
        ;
        cargaEncontrada.alterarDados(input.codigoCarga, input.quantidade, input.unidadeMedida, input.origem, input.destino, input.responsavelTecnico);
        const cargaAtualizada = await this.cargaQuimicaRepository.atualizar(cargaEncontrada);
        if (!cargaAtualizada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrado durante a alteração`
            }, "ResourceNotFoundError");
        }
        return cargaAtualizada;
    }
}
//# sourceMappingURL=atualizar-carga.use-case.js.map