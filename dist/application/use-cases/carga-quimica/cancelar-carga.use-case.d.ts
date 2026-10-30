import type { CargaQuimicaRepository } from "../../ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
export declare class CancelarCargaQuimicaUseCase {
    private readonly cargaQuimicaRepository;
    constructor(cargaQuimicaRepository: CargaQuimicaRepository);
    execute(id: number): Promise<CargaQuimica | undefined>;
}
//# sourceMappingURL=cancelar-carga.use-case.d.ts.map