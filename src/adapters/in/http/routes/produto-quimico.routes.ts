import type { FastifyInstance } from "fastify";
import type { InputRegistrarProdutoQuimicoDto } from "@/application/dtos/registrar-produto-quimico.dto.js"
import { ProdutoQuimicoController } from "@/adapters/in/http/controller/produto-quimico.controller.js"
import type { InputAlterarProdutoQuimico } from "@/application/dtos/alterar-produto-quimico.dto.js";

export async function produtoQuimicoRoutes(app: FastifyInstance, controller: ProdutoQuimicoController) {
    app.post<{ Body: InputRegistrarProdutoQuimicoDto }>("/produtos-quimicos", (request, reply) => {
        return controller.registrar(request, reply);
    });

    app.get("/produtos-quimicos", (request, reply) => {
        return controller.findAll(request, reply);
    });

    app.get<{ Params: { id: string } }>("/produtos-quimicos/:id", (request, reply) => {
        return controller.findId(request, reply);
    });

    app.patch<{ Params: { id: string } }>("/produtos-quimicos/:id/inativar", (request, reply) => {
        return controller.inativar(request, reply);
    })

    app.put<{ Params: { id: string }, Body: InputAlterarProdutoQuimico }>("/produtos-quimicos/:id", (request, reply) => {
        return controller.alterar(request, reply)
    })


}