import { RegistrarCargaQuimicaUseCase } from "../../../../application/use-cases/carga-quimica/registrar-carga.use-case.js";
export class CargaQuimicaController {
    registrarCarga;
    constructor(registrarCarga) {
        this.registrarCarga = registrarCarga;
    }
    async registrar(request, reply) {
        const input = request.body;
        const carga = await this.registrarCarga.execute(input);
        return reply.code(201).send(carga);
    }
}
//# sourceMappingURL=carga-quimica.controller.js.map