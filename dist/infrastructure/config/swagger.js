import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
export async function registerSwagger(app) {
    await app.register(swagger, {
        openapi: {
            info: {
                title: "QuimiPort API",
                description: "API para gerenciamento de cargas e produtos químicos no Porto de Santos.",
                version: "1.0.0"
            },
            tags: [
                { name: "Produtos Químicos", description: "Operações de produtos químicos" },
                { name: "Cargas Químicas", description: "Operações de cargas químicas" }
            ]
        }
    });
    await app.register(swaggerUi, {
        routePrefix: "/docs"
    });
}
//# sourceMappingURL=swagger.js.map