import { DomainValidationError } from "./domain-validation.error.js";
export function validarCriacaoCarga(produtoQuimicoId, quantidadeCarga, responsavelTecnico) {
    const erros = [];
    // Validar apenas letras e com espaço
    const apenasLetras = new RegExp('^(?=.*[a-záàâãéèêíïóôõöúçñ])[a-záàâãéèêíïóôõöúçñ ]+$', 'i');
    if (!produtoQuimicoId || Number.isNaN(produtoQuimicoId)) {
        erros.push({ code: "REQUIRED_FIELD", field: "produtoQuimicoId", message: "Carga Química deve conter um Produto Químico associado" });
    }
    if (produtoQuimicoId < 0 || !Number.isInteger(produtoQuimicoId)) {
        erros.push({ code: "INVALID_FIELD", field: "produtoQuimicoId", message: "Produto Químico ID inválido" });
    }
    if (quantidadeCarga <= 0) {
        erros.push({ code: "INVALID_FIELD", field: "quantidade", message: "Carga Química deve conter quantidade maior que 0" });
    }
    if (!responsavelTecnico || !apenasLetras.test(responsavelTecnico)) {
        erros.push({ code: "REQUIRED_FIELD", field: "responsavelTecnico", message: "Carga Química deve conter um responsável técnico" });
    }
    // if(!apenasLetras.test(responsavelTecnico)){// Validar apenas letras e com espaço 
    //     erros.push({code: "INVALID_FIELD", field: "responsavelTecnico", message:`Nome inválido: [${responsavelTecnico}]`})
    // }
    if (erros.length > 0) {
        throw new DomainValidationError(erros, "A carga possui dados inválidos");
    }
}
//# sourceMappingURL=carga-quimica.validation.js.map