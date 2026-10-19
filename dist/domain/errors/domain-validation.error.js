export class DomainValidationError extends Error {
    violations;
    constructor(violations, message) {
        super(message);
        this.violations = violations;
        this.name = "DomainValidationError";
    }
    exibirErros() {
        return this.violations.map((item, index) => `[${index + 1}]\n code: ${item.code}\n field: ${item.field}\n message: ${item.message}\n`).join("\n");
    }
}
//# sourceMappingURL=domain-validation.error.js.map