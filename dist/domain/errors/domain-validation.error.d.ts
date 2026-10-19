import type { DomainError } from "../errors/domain-interface.error.js";
export declare class DomainValidationError extends Error {
    readonly violations: DomainError[];
    constructor(violations: DomainError[], message: string);
    exibirErros(): string;
}
//# sourceMappingURL=domain-validation.error.d.ts.map