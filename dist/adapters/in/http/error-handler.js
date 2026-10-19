import { DomainValidationError } from "../../../domain/errors/domain-validation.error.js";
// A função recebe a instância já criada pela aplicação.
export function registerErrorHandler(app) {
    // Dentro dela, você registrará o setErrorHandler().
    app.setErrorHandler(function (error, request, reply) {
        // Se o erro for uma instância da classe erro personalizada
        if (error instanceof DomainValidationError) {
            reply.code(400).send({ "error": error.name, "message": error.message, "violations": error.violations });
        }
        else {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    });
}
//# sourceMappingURL=error-handler.js.map