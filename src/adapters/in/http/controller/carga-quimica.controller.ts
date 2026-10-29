import type { FastifyReply, FastifyRequest } from "fastify";
import { RegistrarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/registrar-carga.use-case.js"
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"
import type { ListarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/listar-carga.use-case.js";
import type { BuscarCargaQuimicaPorIdUseCase } from "@/application/use-cases/carga-quimica/listar-id-carga.use-case.js";
import type { InputAlterarCargaQuimica } from "@/application/dtos/alterar-carga-quimica.dto.js";
import type { AtualizaCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/atualizar-carga.use-case.js";
import type { AnalisarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/analisar-carga.use-case.js";
import type { InspecionarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/inspecionar-carga.use-case.js";
import type { LiberarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/liberar-carga.use-case.js";

export class CargaQuimicaController {

    constructor(private readonly registrarCarga: RegistrarCargaQuimicaUseCase,
        private readonly findAllProdutos: ListarCargaQuimicaUseCase,
        private readonly findCargaById: BuscarCargaQuimicaPorIdUseCase,
        private readonly alterarCarga: AtualizaCargaQuimicaUseCase,
        private readonly analisarCarga: AnalisarCargaQuimicaUseCase,
        private readonly inspecionarCarga: InspecionarCargaQuimicaUseCase,
        private readonly liberarCarga: LiberarCargaQuimicaUseCase
    ) { }

    public async registrar(request: FastifyRequest<{
        Body: InputRegistrarCargaQuimicaDto
    }>, reply: FastifyReply) {
        const input = request.body

        const carga = await this.registrarCarga.execute(input);
        return reply.code(201).send(carga)
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply) {
        const carga = await this.findAllProdutos.execute();
        return reply.code(200).send(carga);
    }

    public async findId(request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply) {
        const id = Number(request.params.id)
        const carga = await this.findCargaById.excute(id);
        return reply.code(200).send(carga)
    }

    public async alterar(request: FastifyRequest<{
        Params: { id: string }, Body: InputAlterarCargaQuimica
    }>, reply: FastifyReply
    ) {
        const id = Number(request.params.id);
        const input = request.body;
        const cargas = await this.alterarCarga.execute(id, input);
        return reply.code(200).send(cargas);

    }

    public async analisar(request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ){
        const id = Number(request.params.id);
        const cargas = await this.analisarCarga.execute(id);
        return reply.code(200).send(cargas);
    }

    public async inspecionar(request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ){
        const id = Number(request.params.id);
        const cargas = await this.inspecionarCarga.execute(id);
        return reply.code(200).send(cargas);
    }

    public async liberar(request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ){
        const id = Number(request.params.id);
        const cargas = await this.liberarCarga.execute(id);
        return reply.code(200).send(cargas);
    }
}
