import type { DomainError } from "@/domain/errors/domain-interface.error.js";


export class ResourceNotFoundError extends Error{
    constructor(public readonly violations: DomainError, message: string){
        super(violations.message);
        this.name= "ResourceNotFoundError"
    }
}