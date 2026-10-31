import { StatusProduto } from "../enums/status-produto.enum.js";
import { NumeroOnu } from "../entities/numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { DomainValidationError } from "./domain-validation.error.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
export function validarCriacao(nome, numeroOnu, classeRisco, statusProduto) {
    const erros = [];
    //  Regras de validação para a criação de um produto               
    if (!nome) {
        // erros.push("Produto deve conter um nome");
        erros.push({ code: "REQUIRED_FIELD", field: "name", message: "Produto deve conter um nome" });
    }
    if (!numeroOnu) {
        erros.push({ code: "REQUIRED_FIELD", field: "numeroOnu", message: "Produto deve conter o Número ONU" });
    }
    //  Se não houver classe de risco ou não existe a classe dentro do ENUM
    if (!classeRisco || !(Object.values(ClasseRisco).includes(classeRisco))) {
        erros.push({ code: "REQUIRED_FIELD", field: "classeRisco", message: "Classe de Risco Inválida" });
    }
    if (!Object.values(StatusProduto).includes(statusProduto)) {
        erros.push({ code: "INVALID_FIELD", field: "statusProduto", message: "Produto não pode ser cadastrado com o status Inativo" });
    }
    // if (!(Object.values(StatusProduto).includes(statusProduto))){
    //     erros.push(`Status inválido `);
    // }
    if (erros.length > 0) {
        // throw new DomainValidationError(`\n${erros.map((item,index) => `[${index+1}]\n code: ${item.code}\n field: ${item.field}\n message: ${item.message}\n`).join("\n")}`)
        throw new DomainValidationError(erros, "O produto possui dados inválidos");
    }
}
export function validarAlteracao(nome, numeroOnu, classeRisco, descricao, grupoCompatibilidade) {
    const erros = [];
    //  Regras de validação para a criação de um produto               
    if (!nome.trim() || !nome) {
        // erros.push("Produto deve conter um nome");
        erros.push({ code: "MISSING_FIELD", field: "nome", message: "Produto deve conter um nome" });
    }
    if (!numeroOnu) {
        erros.push({ code: "MISSING_FIELD", field: "numeroOnu", message: "Produto deve conter o Número ONU" });
    }
    //  Se não houver classe de risco ou não existe a classe dentro do ENUM
    if (!classeRisco || !(Object.values(ClasseRisco).includes(classeRisco))) {
        erros.push({ code: "REQUIRED_FIELD", field: "classeRisco", message: "Classe de Risco Inválida" });
    }
    if (!descricao.trim() || !descricao) {
        erros.push({ code: "REQUIRED_FIELD", field: "descricao", message: "Produto deve conter uma descrição" });
    }
    if (!grupoCompatibilidade || !Object.values(GrupoCompatibilidade).includes(grupoCompatibilidade)) {
        erros.push({ code: "REQUIRED_FIELD", field: "grupoCompatibilidade", message: "Grupo de compatibilidade inválido" });
    }
    if (erros.length > 0) {
        throw new DomainValidationError(erros, "O produto possui dados inválidos");
    }
}
//# sourceMappingURL=produto-quimico.validation.js.map