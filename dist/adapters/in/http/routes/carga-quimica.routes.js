import { CargaQuimicaController } from "../controller/carga-quimica.controller.js";
export async function cargaQuimicaRoutes(app, controller) {
    app.post("/cargas-quimicas", (request, reply) => {
        return controller.registrar(request, reply);
    });
}
;
//# sourceMappingURL=carga-quimica.routes.js.map