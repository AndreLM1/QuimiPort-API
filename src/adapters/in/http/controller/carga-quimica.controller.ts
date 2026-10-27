import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/registrar-carga.use-case.js"
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"

export class CargaQuimicaController {

    constructor(private readonly registrarCarga: RegistrarCargaQuimicaUseCase) { }

    public async registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto
    }>, reply: FastifyReply) {
        const input = request.body

        const carga = await this.registrarCarga.execute(input);
        return reply.code(201).send(carga)
    }
}
