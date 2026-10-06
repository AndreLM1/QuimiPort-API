import { NumeroOnu } from "./numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js"
import { StatusProduto } from "../enums/status-produto.enum.js"
import { GrupoCompatibilidade  } from "../enums/grupo-compatibilidade.enum.js"

export class ProdutoQuimico{
     constructor(
        // public id: number,
        public nome: string,
        public numeroOnu: NumeroOnu, // CLASS 
        // public descricao: string,
        public classeRisco: ClasseRisco, //ENUM
        public statusProduto: StatusProduto, //ENUM
        // public dataCriacao: Date,
        // public dataAlteracao: Date,
        // public grupoCompatibilidade : GrupoCompatibilidade // ENUM
    ){
        const erros: string[] = [];

        //  Regras de validação para a criação de um produto               
        if(!nome){
            erros.push("Produto deve conter um nome");
        }
        if(!numeroOnu){
            erros.push("Produto deve conter o número ONU associado");
        }
        if (!classeRisco){
            erros.push("Produto deve conter classe de risco");
        }
        if(!statusProduto || statusProduto === StatusProduto.Inativo){
            erros.push("Produto deve estar com o status = ATIVO");
        }
        

        if(erros.length > 0){
            throw new Error(`Campos estão inválidos:\n${erros.map(item => `[${item}]`).join('\n')}`);
        }
    }
}

