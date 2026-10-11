import { StatusProduto } from "../enums/status-produto.enum.js"
import { NumeroOnu } from "../entities/numero-onu.js"
import { ClasseRisco } from "../enums/classe-de-risco.enum.js"
import { DomainValidationError } from "./domain-validation.error.js"

export function validarCriacao(nome: string, numeroOnu: NumeroOnu ,classeRisco: ClasseRisco, statusProduto: StatusProduto){
    
    const erros: string[] = [];

        //  Regras de validação para a criação de um produto               
        if(!nome){
            erros.push("Produto deve conter um nome");
        }
        if(!numeroOnu){
            erros.push("Produto deve conter o número ONU associado");
        }
        //  Se não houver classe de risco ou não existe a classe dentro do ENUM
        if (!classeRisco){
            erros.push("Produto deve conter classe de risco");
        }
        if (!(Object.values(ClasseRisco).includes(classeRisco))){
            erros.push("Classe de risco inválida");
        }
        if(!statusProduto || statusProduto === StatusProduto.Inativo){
            erros.push("Produto deve estar com o status = ATIVO");
        }
        if (!(Object.values(StatusProduto).includes(statusProduto))){
            erros.push(`Status inválido `);
        }
        
        if(erros.length > 0){
            // const validacaoErros = new DomainValidationError(`${erros.map(item => `${item}`).join('\n')}`)
            // // throw new Error(`Product Validation Error\n${erros.map(item => `[${item}]`).join('\n')}`);
            // console.log(validacaoErros)
            throw new DomainValidationError(`\n${erros.map(item => `[${item}]`).join(' \n')}`)
        }
}
