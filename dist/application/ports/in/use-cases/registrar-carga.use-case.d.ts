import { CargaQuimica } from "../../../../domain/entities/carga-quimica.js";
import type { InputRegistrarCargaQuimicaDto } from "../dtos/registrar-carga-quimica.dto.js";
import type { ProdutoQuimicoRepository } from "../ports/out/produto-quimico-repository.js";
import type { CargaQuimicaRepository } from "../ports/out/carga-quimica-repository.js";
export declare class RegistrarCargaQuimicaUseCase {
    private produtoQuimicoRepository;
    private cargaQuimicaRepository;
    constructor(produtoQuimicoRepository: ProdutoQuimicoRepository, cargaQuimicaRepository: CargaQuimicaRepository);
    execute(input: InputRegistrarCargaQuimicaDto): Promise<CargaQuimica>;
}
//# sourceMappingURL=registrar-carga.use-case.d.ts.map