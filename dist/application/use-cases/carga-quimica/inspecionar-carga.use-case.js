import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
export class InspecionarCargaQuimicaUseCase {
    cargaQuimicaRepository;
    constructor(cargaQuimicaRepository) {
        this.cargaQuimicaRepository = cargaQuimicaRepository;
    }
    async execute(id) {
        const cargaEcontrada = await this.cargaQuimicaRepository.findById(id);
        if (!cargaEcontrada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        }
        ;
        cargaEcontrada.inspecionar();
        const cargaAtualizada = await this.cargaQuimicaRepository.atualizarStatus(cargaEcontrada);
        if (!cargaAtualizada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id",
                message: `Carga Química com ID ${id} não encontrada durante a análise`
            }, "ResourceNotFoundError");
        }
        return cargaAtualizada;
    }
}
//# sourceMappingURL=inspecionar-carga.use-case.js.map