import type { CargaQuimicaRepository } from "@/application/ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "@/domain/entities/carga-quimica.js";

export class ListarCargaQuimicaUseCase{
    constructor(private readonly cargaQuimicaRepository: CargaQuimicaRepository){}

    async execute(): Promise<CargaQuimica[]> {
        return await this.cargaQuimicaRepository.findAll();
    }
}