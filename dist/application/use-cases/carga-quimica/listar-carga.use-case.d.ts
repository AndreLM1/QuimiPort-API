import type { CargaQuimicaRepository } from "../../ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
export declare class ListarCargaQuimicaUseCase {
    private readonly cargaQuimicaRepository;
    constructor(cargaQuimicaRepository: CargaQuimicaRepository);
    execute(): Promise<CargaQuimica[]>;
}
//# sourceMappingURL=listar-carga.use-case.d.ts.map