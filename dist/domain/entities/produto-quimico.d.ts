import { NumeroOnu } from "./numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { StatusProduto } from "../enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
export declare class ProdutoQuimico {
    id: number;
    nome: string;
    numeroOnu: NumeroOnu;
    descricao: string;
    classeRisco: ClasseRisco;
    statusProduto: StatusProduto;
    dataCriacao: Date;
    grupoCompatibilidade: GrupoCompatibilidade;
    dataAlteracao?: Date | undefined;
    constructor(id: number, nome: string, numeroOnu: NumeroOnu, // CLASS 
    descricao: string, classeRisco: ClasseRisco, //ENUM
    statusProduto: StatusProduto, //ENUM
    dataCriacao: Date, grupoCompatibilidade: GrupoCompatibilidade, // ENUM
    dataAlteracao?: Date | undefined);
    private validarDados;
}
//# sourceMappingURL=produto-quimico.d.ts.map