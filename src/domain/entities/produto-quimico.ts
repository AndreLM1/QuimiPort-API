import { NumeroOnu } from "./numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js"
import { StatusProduto } from "../enums/status-produto.enum.js"
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js"
import { validarCriacao } from "../errors/produto-quimico.validation.js"

export class ProdutoQuimico {
    constructor(
        public nome: string,
        public numeroOnu: NumeroOnu, // CLASS 
        public descricao: string,
        public classeRisco: ClasseRisco, //ENUM
        public statusProduto: StatusProduto, //ENUM        
        public grupoCompatibilidade: GrupoCompatibilidade, // ENUM
        public dataCriacao?: Date | null,
        public dataAlteracao?: Date | null,
        public id?: number


    ) {
        //  Chamando o método para validar a criacao do protudo quimico
        this.validarDados()
    }

    // Metodo para validar os dados
    private validarDados(): void {
        validarCriacao(this.nome, this.numeroOnu, this.classeRisco, this.statusProduto);
    };

    public inativar(): void {
        if(this.statusProduto === StatusProduto.Inativo){
            return;
        };
        this.statusProduto = StatusProduto.Inativo;
    }
}

