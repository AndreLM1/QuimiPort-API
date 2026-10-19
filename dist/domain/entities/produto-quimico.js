import { NumeroOnu } from "./numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { StatusProduto } from "../enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
import { validarCriacao } from "../errors/produto-quimico.validation.js";
export class ProdutoQuimico {
    nome;
    numeroOnu;
    descricao;
    classeRisco;
    statusProduto;
    dataCriacao;
    grupoCompatibilidade;
    dataAlteracao;
    id;
    constructor(nome, numeroOnu, // CLASS 
    descricao, classeRisco, //ENUM
    statusProduto, //ENUM
    dataCriacao, grupoCompatibilidade, // ENUM
    dataAlteracao, id) {
        this.nome = nome;
        this.numeroOnu = numeroOnu;
        this.descricao = descricao;
        this.classeRisco = classeRisco;
        this.statusProduto = statusProduto;
        this.dataCriacao = dataCriacao;
        this.grupoCompatibilidade = grupoCompatibilidade;
        this.dataAlteracao = dataAlteracao;
        this.id = id;
        //  Chamando o método para validar a criacao do protudo quimico
        this.validarDados();
    }
    // Metodo para validar os dados
    validarDados() {
        validarCriacao(this.nome, this.numeroOnu, this.classeRisco, this.statusProduto);
    }
}
//# sourceMappingURL=produto-quimico.js.map