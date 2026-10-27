import { StatusCargaQuimica } from "../enums/status-carga-quimica.enum.js";
import { UnidadeDeMedida } from "../enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "./documentoObrigatorio.js";
export declare class CargaQuimica {
    codigoCarga: string;
    produtoQuimicoId: number;
    quantidade: number;
    unidadeMedida: UnidadeDeMedida;
    origem: string;
    destino: string;
    responsavelTecnico: string;
    documentoObrigatorio: DocumentoObrigatorio;
    dataEntrada?: Date | null | undefined;
    dataCriacao?: Date | null | undefined;
    dataAtualizacao?: Date | null | undefined;
    id?: number | undefined;
    constructor(codigoCarga: string, produtoQuimicoId: number, quantidade: number, unidadeMedida: UnidadeDeMedida, origem: string, destino: string, responsavelTecnico: string, documentoObrigatorio: DocumentoObrigatorio, dataEntrada?: Date | null | undefined, dataCriacao?: Date | null | undefined, dataAtualizacao?: Date | null | undefined, id?: number | undefined);
    private validarDados;
    private _statusCarga;
    get statusCarga(): StatusCargaQuimica;
    analisar(): void;
    inspecionar(): void;
    bloquear(): void;
    liberar(): void;
    movimentar(): void;
    finalizar(): void;
    cancelar(): void;
}
//# sourceMappingURL=carga-quimica.d.ts.map