import type { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
export interface CargaQuimicaRepository {
    registrar(cargaQuimica: CargaQuimica): Promise<CargaQuimica>;
}
//# sourceMappingURL=carga-quimica-repository.d.ts.map