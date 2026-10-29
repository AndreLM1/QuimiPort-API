import type { UnidadeDeMedida } from "@/domain/enums/unidade-de-medida.enum.js";

export interface InputAlterarCargaQuimica {
    codigoCarga: string,
    quantidade: number,
    unidadeMedida: UnidadeDeMedida,
    origem: string,
    destino: string,
    responsavelTecnico: string
};