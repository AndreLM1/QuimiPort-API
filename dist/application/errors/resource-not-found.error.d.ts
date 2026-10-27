import type { DomainError } from "../../domain/errors/domain-interface.error.js";
export declare class ResourceNotFoundError extends Error {
    readonly violations: DomainError;
    constructor(violations: DomainError, message: string);
}
//# sourceMappingURL=resource-not-found.error.d.ts.map