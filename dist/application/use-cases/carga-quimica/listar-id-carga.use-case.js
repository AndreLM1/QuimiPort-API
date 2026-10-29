import { ResourceNotFoundError } from "../../errors/resource-not-found.error.js";
export class BuscarCargaQuimicaPorIdUseCase {
    cargaQuimicaRepository;
    constructor(cargaQuimicaRepository) {
        this.cargaQuimicaRepository = cargaQuimicaRepository;
    }
    ;
    async excute(id) {
        const cargaEcontrada = await this.cargaQuimicaRepository.findById(id);
        if (!cargaEcontrada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        }
        return cargaEcontrada;
    }
}
//# sourceMappingURL=listar-id-carga.use-case.js.map