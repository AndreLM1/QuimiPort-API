import { DomainValidationError } from "./domain-validation.error.js";
import type { DomainError } from "./domain-interface.error.js";

export function validarCriacaoCarga(produtoQuimicoId: number, quantidadeCarga: number, responsavelTecnico: string){
    const erros: DomainError[] = [];
    // Validar apenas letras e com espaço
    const apenasLetras = new RegExp('^(?=.*[a-záàâãéèêíïóôõöúçñ])[a-záàâãéèêíïóôõöúçñ ]+$', 'i');
    

    if(!produtoQuimicoId){
        erros.push({code: "REQUIRED_FIELD", field: "produtoQuimicoId", message:"Carga Química deve conter um Produto Químico associado"})
    }
    if(Number.isNaN(produtoQuimicoId) || produtoQuimicoId < 0 || !Number.isInteger(produtoQuimicoId)){
        erros.push({code: "INVALID_FIELD", field: "produtoQuimicoId", message:"Produto Químico ID inválido"})
    }
    if(quantidadeCarga <= 0){
        erros.push({code: "INVALID_FIELD", field: "quantidade", message:"Carga Química deve conter quantidade maior que 0"})
    }
    if(!responsavelTecnico){       
        erros.push({code: "REQUIRED_FIELD", field: "responsavelTecnico", message:"Carga Química deve conter um responsável técnico"})
    }
    if(!apenasLetras.test(responsavelTecnico)){// Validar apenas letras e com espaço 
        erros.push({code: "INVALID_FIELD", field: "responsavelTecnico", message:`Nome inválido: [${responsavelTecnico}]`})
    }

    if(erros.length > 0){
        throw new DomainValidationError(erros, "A carga possui dados inválidos")
    }
}