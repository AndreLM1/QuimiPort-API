import type { CargaQuimicaRepository } from "../../../../application/ports/out/carga-quimica-repository.js";
import { DatabaseConnection } from "../postgres/database.js";
import { CargaQuimica } from "../../../../domain/entities/carga-quimica.js";
export declare class CargaQuimicaSqlRepository implements CargaQuimicaRepository {
    private readonly db;
    constructor(db: typeof DatabaseConnection);
    registrar(cargaQuimica: CargaQuimica): Promise<CargaQuimica>;
    findAll(): Promise<CargaQuimica[]>;
}
//# sourceMappingURL=carga-quimica.repository.d.ts.map