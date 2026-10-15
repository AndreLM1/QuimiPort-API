import type { DomainError } from "../errors/domain-interface.error.js"

export class DomainValidationError extends Error{
    constructor(public readonly violations: DomainError[], message: string){
        super(message);
        this.name = "DomainValidationError"
        
    }

    exibirErros(){
        return this.violations.map((item,index) => `[${index+1}]\n code: ${item.code}\n field: ${item.field}\n message: ${item.message}\n`).join("\n")
    }

}