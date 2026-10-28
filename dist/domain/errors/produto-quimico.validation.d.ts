import { StatusProduto } from "../enums/status-produto.enum.js";
import { NumeroOnu } from "../entities/numero-onu.js";
import { ClasseRisco } from "../enums/classe-de-risco.enum.js";
import { GrupoCompatibilidade } from "../enums/grupo-compatibilidade.enum.js";
export declare function validarCriacao(nome: string, numeroOnu: NumeroOnu, classeRisco: ClasseRisco, statusProduto: StatusProduto): void;
export declare function validarAlteracao(nome: string, numeroOnu: NumeroOnu, classeRisco: ClasseRisco, descricao: string, grupoCompatibilidade: GrupoCompatibilidade): void;
//# sourceMappingURL=produto-quimico.validation.d.ts.map