import { ClasseRisco } from "@/domain/enums/classe-de-risco.enum.js";
import { GrupoCompatibilidade } from "@/domain/enums/grupo-compatibilidade.enum.js";

export interface InputAlterarProdutoQuimico {
    nome: string,
    numeroOnu: string
    descricao: string,
    classeRisco: ClasseRisco, //ENUM
    grupoCompatibilidade: GrupoCompatibilidade // ENUM
};
