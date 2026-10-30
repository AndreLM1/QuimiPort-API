import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
export class BloquearCargaQuimicaUseCase {
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
        cargaEcontrada.bloquear();
        const cargaAtualizada = await this.cargaQuimicaRepository.atualizarStatus(cargaEcontrada);
        if (!cargaAtualizada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id",
                message: `Carga Química com ID ${id} não encontrada durante a movimentação`
            }, "ResourceNotFoundError");
        }
        return cargaAtualizada;
    }
}
//# sourceMappingURL=bloquear-carga.use-case.js.map