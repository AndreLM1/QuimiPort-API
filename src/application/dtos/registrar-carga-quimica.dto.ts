import type { DocumentoObrigatorio } from "@/domain/entities/documentoObrigatorio.js";
import { UnidadeDeMedida } from "../../domain/enums/unidade-de-medida.enum.js"

export interface InputRegistrarCargaQuimica {
    codigoCarga: string;
    produtoQuimicoId: number
    quantidade: number,
    unidadeMedida: UnidadeDeMedida,
    origem: string,
    destino: string,
    responsavelTecnico: string,
    documentoObrigatorio: DocumentoObrigatorio
}


