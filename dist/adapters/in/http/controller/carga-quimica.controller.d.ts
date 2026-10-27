import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
import type { InputRegistrarCargaQuimicaDto } from "../../../../application/dtos/registrar-carga-quimica.dto.js";
export declare class CargaQuimicaController {
    private readonly registrarCarga;
    constructor(registrarCarga: RegistrarCargaQuimicaUseCase);
    registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto;
    }>, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=carga-quimica.controller.d.ts.map