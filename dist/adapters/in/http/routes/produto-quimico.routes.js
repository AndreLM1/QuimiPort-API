import { ProdutoQuimicoController } from "../controller/produto-quimico.controller.js";
export async function produtoQuimicoRoutes(app, controller) {
    app.post("/produtos-quimicos", (request, reply) => {
        return controller.registrar(request, reply);
    });
    app.get("/produtos-quimicos", (request, reply) => {
        return controller.findAll(request, reply);
    });
    app.get("/produtos-quimicos/:id", (request, reply) => {
        return controller.findId(request, reply);
    });
}
//# sourceMappingURL=produto-quimico.routes.js.map