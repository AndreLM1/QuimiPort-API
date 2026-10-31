export class ResourceConflictError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "ResourceConflictError";
    }
}
//# sourceMappingURL=resource-conflict.errors.js.map