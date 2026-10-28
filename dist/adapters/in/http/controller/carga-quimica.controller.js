import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
export class CargaQuimicaController {
    registrarCarga;
    findAllProdutos;
    constructor(registrarCarga, findAllProdutos) {
        this.registrarCarga = registrarCarga;
        this.findAllProdutos = findAllProdutos;
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
}
//# sourceMappingURL=carga-quimica.controller.js.map