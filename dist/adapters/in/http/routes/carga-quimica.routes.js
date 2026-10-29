import { CargaQuimicaController } from "../controller/carga-quimica.controller.js";
export async function cargaQuimicaRoutes(app, controller) {
    app.post("/cargas-quimicas", (request, reply) => {
        return controller.registrar(request, reply);
    });
    app.get("/cargas-quimicas", (request, reply) => {
        return controller.findAll(request, reply);
    });
    app.get("/cargas-quimicas/:id", (request, reply) => {
        return controller.findId(request, reply);
    });
    app.put("/cargas-quimicas/:id", (request, reply) => {
        return controller.alterar(request, reply);
    });
    app.patch("/cargas-quimicas/:id/analisar", (request, reply) => {
        return controller.analisar(request, reply);
    });
    app.patch("/cargas-quimicas/:id/inspecionar", (request, reply) => {
        return controller.inspecionar(request, reply);
    });
    app.patch("/cargas-quimicas/:id/liberar", (request, reply) => {
        return controller.liberar(request, reply);
    });
}
;
//# sourceMappingURL=carga-quimica.routes.js.map