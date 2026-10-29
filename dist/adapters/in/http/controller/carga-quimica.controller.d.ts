import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
import type { InputRegistrarCargaQuimicaDto } from "../../../../application/dtos/registrar-carga-quimica.dto.js";
import type { ListarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/listar-carga.use-case.js";
import type { BuscarCargaQuimicaPorIdUseCase } from "../../../../application/use-cases/carga-quimica/listar-id-carga.use-case.js";
import type { InputAlterarCargaQuimica } from "../../../../application/dtos/alterar-carga-quimica.dto.js";
import type { AtualizaCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/atualizar-carga.use-case.js";
import type { AnalisarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/analisar-carga.use-case.js";
export declare class CargaQuimicaController {
    private readonly registrarCarga;
    private readonly findAllProdutos;
    private readonly findCargaById;
    private readonly alterarCarga;
    private readonly analisarCarga;
    constructor(registrarCarga: RegistrarCargaQuimicaUseCase, findAllProdutos: ListarCargaQuimicaUseCase, findCargaById: BuscarCargaQuimicaPorIdUseCase, alterarCarga: AtualizaCargaQuimicaUseCase, analisarCarga: AnalisarCargaQuimicaUseCase);
    registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto;
    }>, reply: FastifyReply): Promise<never>;
    findAll(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    findId(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    alterar(request: FastifyRequest<{
        Params: {
            id: string;
        };
        Body: InputAlterarCargaQuimica;
    }>, reply: FastifyReply): Promise<never>;
    analisar(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=carga-quimica.controller.d.ts.map