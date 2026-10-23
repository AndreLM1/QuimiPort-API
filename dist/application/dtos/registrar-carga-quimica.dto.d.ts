import type { DocumentoObrigatorio } from "../../domain/entities/documentoObrigatorio.js";
import type { UnidadeDeMedida } from "../../domain/enums/unidade-de-medida.enum.js";
export interface InputRegistrarCargaQuimicaDto {
    codigoCarga: string;
    produtoQuimicoId: number;
    quantidade: number;
    unidadeMedida: UnidadeDeMedida;
    origem: string;
    destino: string;
    responsavelTecnico: string;
    documentoObrigatorio: DocumentoObrigatorio;
}
//# sourceMappingURL=registrar-carga-quimica.dto.d.ts.map