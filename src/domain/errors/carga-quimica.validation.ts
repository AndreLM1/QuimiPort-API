import { DomainValidationError } from "./domain-validation.error.js";
import type { DomainError } from "./domain-interface.error.js";
import { UnidadeDeMedida } from "@/domain/enums/unidade-de-medida.enum.js"

export function validarCriacaoCarga(produtoQuimicoId: number, quantidadeCarga: number, responsavelTecnico: string) {
    const erros: DomainError[] = [];
    // Validar apenas letras e com espaço
    const apenasLetras = new RegExp('^(?=.*[a-záàâãéèêíïóôõöúçñ])[a-záàâãéèêíïóôõöúçñ ]+$', 'i');


    if (!produtoQuimicoId || Number.isNaN(produtoQuimicoId)) {
        erros.push({ code: "REQUIRED_FIELD", field: "produtoQuimicoId", message: "Carga Química deve conter um Produto Químico associado" })
    }
    if (produtoQuimicoId < 0 || !Number.isInteger(produtoQuimicoId)) {
        erros.push({ code: "INVALID_FIELD", field: "produtoQuimicoId", message: "Produto Químico ID inválido" })
    }
    if (quantidadeCarga <= 0) {
        erros.push({ code: "INVALID_FIELD", field: "quantidade", message: "Carga Química deve conter quantidade maior que 0" })
    }
    if (!responsavelTecnico || !apenasLetras.test(responsavelTecnico)) {
        erros.push({ code: "REQUIRED_FIELD", field: "responsavelTecnico", message: "Carga Química deve conter um responsável técnico" })
    }
    // if(!apenasLetras.test(responsavelTecnico)){// Validar apenas letras e com espaço 
    //     erros.push({code: "INVALID_FIELD", field: "responsavelTecnico", message:`Nome inválido: [${responsavelTecnico}]`})
    // }

    if (erros.length > 0) {
        throw new DomainValidationError(erros, "A carga possui dados inválidos")
    }
}

export function validarAlteracaoCarga(codigoCarga: string,
    quantidade: number,
    unidadeMedida: UnidadeDeMedida,
    origem: string,
    destino: string,
    responsavelTecnico: string) {
    const erros: DomainError[] = [];
    // Validar apenas letras e com espaço
    const apenasLetras = new RegExp('^(?=.*[a-záàâãéèêíïóôõöúçñ])[a-záàâãéèêíïóôõöúçñ ]+$', 'i');


    if (!codigoCarga.trim()) {
        erros.push({ code: "REQUIRED_FIELD", field: "codigoCarga", message: "Carga Química deve conter um código" })
    }
    if (!quantidade) {
        erros.push({ code: "INVALID_FIELD", field: "quantidade", message: "Informar a quantidade da Carga Química" })
    }
    if (quantidade <= 0) {
        erros.push({ code: "INVALID_FIELD", field: "quantidade", message: "Carga Química deve conter quantidade maior que 0" })
    }
    if (!unidadeMedida || !(Object.values(UnidadeDeMedida).includes(unidadeMedida))) {
        erros.push({ code: "INVALID_FIELD", field: "unidadeMedida", message: "Unidade de Medida inválida" })
    }
    if (!origem) {
        erros.push({ code: "INVALID_FIELD", field: "origem", message: "Informar a origem da Carga Química" })
    }
    if (!destino) {
        erros.push({ code: "INVALID_FIELD", field: "destino", message: "Informar o destino da Carga Química" })
    }
    if (!responsavelTecnico || !apenasLetras.test(responsavelTecnico)) {
        erros.push({ code: "REQUIRED_FIELD", field: "responsavelTecnico", message: "Carga Química deve conter um responsável técnico" })
    }
    if (erros.length > 0) {
        throw new DomainValidationError(erros, "A carga possui dados inválidos")
    }
}