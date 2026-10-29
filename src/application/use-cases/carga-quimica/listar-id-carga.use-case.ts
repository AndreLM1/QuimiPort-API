import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js";
import type { CargaQuimicaRepository } from "@/application/ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "@/domain/entities/carga-quimica.js";

export class BuscarCargaQuimicaPorIdUseCase{
    constructor(private readonly cargaQuimicaRepository: CargaQuimicaRepository){};

    async excute(id: number): Promise<CargaQuimica | undefined>{
        const cargaEcontrada = await this.cargaQuimicaRepository.findById(id)

        if(!cargaEcontrada){
           throw new ResourceNotFoundError({
                code: "CARGA_QUIMICA_NAO_ENCONTRADA",
                field: "id", message: `Carga Química com ID ${id} não encontrada`
            }, "ResourceNotFoundError");
        }

        return cargaEcontrada;

    }

}