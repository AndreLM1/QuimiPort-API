import { ClasseRisco } from "../../domain/enums/classe-de-risco.enum.js";
import { StatusProduto } from "../../domain/enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "../../domain/enums/grupo-compatibilidade.enum.js";
export interface InputRegistrarProdutoQuimicoDto {
    nome: string;
    numeroOnu: string;
    descricao: string;
    classeRisco: ClasseRisco;
    statusProduto: StatusProduto;
    grupoCompatibilidade: GrupoCompatibilidade;
}
//# sourceMappingURL=registrar-produto-quimico.dto.d.ts.map