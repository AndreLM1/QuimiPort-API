import type { FastifyInstance } from "fastify";
import type { InputRegistrarCargaQuimicaDto } from "@/application/dtos/registrar-carga-quimica.dto.js"
import { CargaQuimicaController } from "@/adapters/in/http/controller/carga-quimica.controller.js";
import type { InputAlterarCargaQuimica } from "@/application/dtos/alterar-carga-quimica.dto.js";

export async function cargaQuimicaRoutes(app: FastifyInstance, controller: CargaQuimicaController) {
    app.post<{ Body: InputRegistrarCargaQuimicaDto }>("/cargas-quimicas", (request, reply) => {
        return controller.registrar(request, reply)
    });

    app.get("/cargas-quimicas", (request, reply) => {
        return controller.findAll(request, reply);
    });

    app.get<{ Params: { id: string } }>("/cargas-quimicas/:id", (request, reply) => {
        return controller.findId(request, reply);
    })

    app.put<{ Params: { id: string }, Body: InputAlterarCargaQuimica }>("/cargas-quimicas/:id", (request, reply) => {
        return controller.alterar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/analisar", (request, reply) => {
        return controller.analisar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/inspecionar", (request, reply) => {
        return controller.inspecionar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/liberar", (request, reply) => {
        return controller.liberar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/movimentar", (request, reply) => {
        return controller.movimentar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/finalizar", (request, reply) => {
        return controller.finalizar(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/bloquear", (request, reply) => {
        return controller.bloquear(request, reply)
    })

    app.patch<{ Params: { id: string }}>("/cargas-quimicas/:id/cancelar", (request, reply) => {
        return controller.cancelar(request, reply)
    })

    
};