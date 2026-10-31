import { DomainValidationError } from "../../../domain/errors/domain-validation.error.js";
import { ResourceNotFoundError } from "../../../application/errors/resource-not-found.error.js";
import { ResourceConflictError } from "../../../application/errors/resource-conflict.errors.js";
// A função recebe a instância já criada pela aplicação.
export function registerErrorHandler(app) {
    // Dentro dela, você registrará o setErrorHandler().
    app.setErrorHandler(function (error, request, reply) {
        // Se o erro for uma instância da classe erro personalizada
        if (error instanceof DomainValidationError) {
            return reply.code(400).send({ "error": error.name, "message": error.message, "violations": error.violations });
        }
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ "code": error.violations.code, "message": error.message });
        }
        if (error.code === "FST_ERR_VALIDATION") {
            return reply.code(400).send({
                error: "ValidationError",
                message: "A requisição possui dados inválidos",
                violations: error.validation?.map((item) => ({
                    code: "INVALID_FIELD",
                    field: item.instancePath?.replace("/", ""),
                    message: item.message
                }))
            });
        }
        if (error instanceof ResourceConflictError) {
            return reply.code(409).send({
                code: error.code,
                message: error.message
            });
        }
        console.log(error);
        return reply.code(500).send({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro interno do servidor"
        });
    });
}
//# sourceMappingURL=error-handler.js.map