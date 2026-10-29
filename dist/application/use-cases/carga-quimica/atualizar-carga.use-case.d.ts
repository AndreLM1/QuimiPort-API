import type { InputAlterarCargaQuimica } from "../../dtos/alterar-carga-quimica.dto.js";
import type { CargaQuimicaRepository } from "../../ports/out/carga-quimica-repository.js";
import type { CargaQuimica } from "../../../domain/entities/carga-quimica.js";
export declare class AtualizaCargaQuimicaUseCase {
    private readonly cargaQuimicaRepository;
    constructor(cargaQuimicaRepository: CargaQuimicaRepository);
    execute(id: number, input: InputAlterarCargaQuimica): Promise<CargaQuimica>;
}
//# sourceMappingURL=atualizar-carga.use-case.d.ts.map