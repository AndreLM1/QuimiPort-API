import type { CargaQuimicaRepository } from "@/application/ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "@/domain/entities/carga-quimica.js";
import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js"

export class FinalizarCargaQuimicaUseCase {
    constructor(private readonly cargaQuimicaRepository: CargaQuimicaRepository) { }

    async execute(id: number): Promise<CargaQuimica | undefined> {
        const cargaEcontrada = await this.cargaQuimicaRepository.findById(id);


        if (!cargaEcontrada) {
            throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        };

        cargaEcontrada.finalizar();

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