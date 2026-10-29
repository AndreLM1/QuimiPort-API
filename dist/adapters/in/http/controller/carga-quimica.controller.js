import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
export class CargaQuimicaController {
    registrarCarga;
    findAllProdutos;
    findCargaById;
    alterarCarga;
    analisarCarga;
    inspecionarCarga;
    liberarCarga;
    constructor(registrarCarga, findAllProdutos, findCargaById, alterarCarga, analisarCarga, inspecionarCarga, liberarCarga) {
        this.registrarCarga = registrarCarga;
        this.findAllProdutos = findAllProdutos;
        this.findCargaById = findCargaById;
        this.alterarCarga = alterarCarga;
        this.analisarCarga = analisarCarga;
        this.inspecionarCarga = inspecionarCarga;
        this.liberarCarga = liberarCarga;
    }
    async registrar(request, reply) {
        const input = request.body;
        const carga = await this.registrarCarga.execute(input);
        return reply.code(201).send(carga);
    }
    async findAll(request, reply) {
        const carga = await this.findAllProdutos.execute();
        return reply.code(200).send(carga);
    }
    async findId(request, reply) {
        const id = Number(request.params.id);
        const carga = await this.findCargaById.excute(id);
        return reply.code(200).send(carga);
    }
    async alterar(request, reply) {
        const id = Number(request.params.id);
        const input = request.body;
        const cargas = await this.alterarCarga.execute(id, input);
        return reply.code(200).send(cargas);
    }
    async analisar(request, reply) {
        const id = Number(request.params.id);
        const cargas = await this.analisarCarga.execute(id);
        return reply.code(200).send(cargas);
    }
    async inspecionar(request, reply) {
        const id = Number(request.params.id);
        const cargas = await this.inspecionarCarga.execute(id);
        return reply.code(200).send(cargas);
    }
    async liberar(request, reply) {
        const id = Number(request.params.id);
        const cargas = await this.liberarCarga.execute(id);
        return reply.code(200).send(cargas);
    }
}
//# sourceMappingURL=carga-quimica.controller.js.map