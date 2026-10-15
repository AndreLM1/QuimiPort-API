import  { StatusCargaQuimica } from "../enums/status-carga-quimica.enum.js";
import  { UnidadeDeMedida } from "../enums/unidade-de-medida.enum.js";
import { validarCriacaoCarga } from "../errors/carga-quimica.validation.js";
import  { DocumentoObrigatorio } from "./documentoObrigatorio.js";


export class CargaQuimica{
    constructor(
        // public codigoCarga: string,
        public produtoQuimicoId: number,
        public quantidade: number,
        // public unidadeMedida: UnidadeDeMedida,
        // public origem: string,
        // public destino: string,
        public responsavelTecnico: string,
        // public documentoObrigatorio: DocumentoObrigatorio,
        // public statusCarga?: StatusCargaQuimica,
        // public dataEntrada?: Date,
        // public dataCriacao?: Date,
        // public dataAtualizacao?: Date,
        // public id?: number
    ){
        this.validarDados();
    }

    private validarDados(): void{
        validarCriacaoCarga(this.produtoQuimicoId, this.quantidade, this.responsavelTecnico);
    }
    
}

new CargaQuimica( 2.1, -1, "MARCELO")
