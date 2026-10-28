import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
import type { InputRegistrarCargaQuimicaDto } from "../../../../application/dtos/registrar-carga-quimica.dto.js";
import type { ListarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/listar-carga.use-case.js";
export declare class CargaQuimicaController {
    private readonly registrarCarga;
    private readonly findAllProdutos;
    constructor(registrarCarga: RegistrarCargaQuimicaUseCase, findAllProdutos: ListarCargaQuimicaUseCase);
    registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto;
    }>, reply: FastifyReply): Promise<never>;
    findAll(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=carga-quimica.controller.d.ts.map