export class ResourceNotFoundError extends Error {
    violations;
    constructor(violations, message) {
        super(violations.message);
        this.violations = violations;
        this.name = "ResourceNotFoundError";
    }
}
//# sourceMappingURL=resource-not-found.error.js.map