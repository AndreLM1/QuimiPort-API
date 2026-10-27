import type { FastifyInstance } from "fastify";
import { DomainValidationError } from "@/domain/errors/domain-validation.error.js";
import { ResourceNotFoundError } from "@/application/errors/resource-not-found.error.js"


// A função recebe a instância já criada pela aplicação.
export function registerErrorHandler(app: FastifyInstance) {
    // Dentro dela, você registrará o setErrorHandler().
    app.setErrorHandler(function(error, request, reply){
        // Se o erro for uma instância da classe erro personalizada
        if(error instanceof DomainValidationError){ 
           return reply.code(400).send({"error": error.name, "message": error.message, "violations": error.violations})
        }

        if(error instanceof ResourceNotFoundError){
            return reply.code(404).send({"code": error.violations.code, "message": error.message})
        }

        console.log(error)
    })
}