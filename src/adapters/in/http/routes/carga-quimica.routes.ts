import type { FastifyInstance } from "fastify";
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"
import { CargaQuimicaController } from "@/adapters/in/http/controller/carga-quimica.controller.js";

export async function cargaQuimicaRoutes (app: FastifyInstance, controller: CargaQuimicaController) {
    app.post<{Body: InputRegistrarCargaQuimicaDto}>("/cargas-quimicas", (request, reply) =>{
        return controller.registrar(request, reply)
    });

    app.get("/cargas-quimicas", (request, reply) =>{
        return controller.findAll(request, reply);
    })
};