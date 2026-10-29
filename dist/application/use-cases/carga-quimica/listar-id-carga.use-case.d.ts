import type { CargaQuimicaRepository } from "../../ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
export declare class BuscarCargaQuimicaPorIdUseCase {
    private readonly cargaQuimicaRepository;
    constructor(cargaQuimicaRepository: CargaQuimicaRepository);
    excute(id: number): Promise<CargaQuimica | undefined>;
}
//# sourceMappingURL=listar-id-carga.use-case.d.ts.map