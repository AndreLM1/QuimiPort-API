import { NumeroOnu } from "./numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { StatusProduto } from "../enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
export declare class ProdutoQuimico {
    nome: string;
    numeroOnu: NumeroOnu;
    descricao: string;
    classeRisco: ClasseRisco;
    statusProduto: StatusProduto;
    grupoCompatibilidade: GrupoCompatibilidade;
    dataCriacao?: Date | null | undefined;
    dataAlteracao?: Date | null | undefined;
    id?: number | undefined;
    constructor(nome: string, numeroOnu: NumeroOnu, // CLASS 
    descricao: string, classeRisco: ClasseRisco, //ENUM
    statusProduto: StatusProduto, //ENUM        
    grupoCompatibilidade: GrupoCompatibilidade, // ENUM
    dataCriacao?: Date | null | undefined, dataAlteracao?: Date | null | undefined, id?: number | undefined);
    private validarDados;
}
//# sourceMappingURL=produto-quimico.d.ts.map