import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/registrar-carga.use-case.js"
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"
import type { ListarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/listar-carga.use-case.js";

export class CargaQuimicaController {

    constructor(private readonly registrarCarga: RegistrarCargaQuimicaUseCase,
        private readonly findAllProdutos: ListarCargaQuimicaUseCase
    ) { }

    public async registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto
    }>, reply: FastifyReply) {
        const input = request.body

        const carga = await this.registrarCarga.execute(input);
        return reply.code(201).send(carga)
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply){
        const carga = await this.findAllProdutos.execute();
        return reply.code(200).send(carga);
    }
}
