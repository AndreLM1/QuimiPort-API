import  { StatusCargaQuimica } from "../enums/status-carga-quimica.enum.js";
import  { UnidadeDeMedida } from "../enums/unidade-de-medida.enum.js";
import { validarCriacaoCarga, validarAlteracaoCarga } from "../errors/carga-quimica.validation.js";
import { DomainValidationError } from "../errors/domain-validation.error.js";
import  { DocumentoObrigatorio } from "./documentoObrigatorio.js";
import type { DomainError } from "../errors/domain-interface.error.js"



export class CargaQuimica{
    constructor(
        public codigoCarga: string,
        public produtoQuimicoId: number,
        public quantidade: number,
        public unidadeMedida: UnidadeDeMedida,
        public origem: string,
        public destino: string,
        public responsavelTecnico: string,
        public documentoObrigatorio: DocumentoObrigatorio,
        public dataEntrada?: Date | null,
        public dataCriacao?: Date | null,
        public dataAtualizacao?: Date | null,
        public id?: number,
        statusCarga: StatusCargaQuimica = StatusCargaQuimica.Registrada
    ){
        this._statusCarga = statusCarga
        this.validarDados();
    }

    private validarDados(): void{
        validarCriacaoCarga(this.produtoQuimicoId, this.quantidade, this.responsavelTecnico);
    }

    private _statusCarga: StatusCargaQuimica;

    public get statusCarga(): StatusCargaQuimica{
        return this._statusCarga;
    }
    
    public analisar(): void{
        const erros: DomainError[] = []
         
        if(this._statusCarga !== StatusCargaQuimica.Registrada){
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Carga não está registrada"})
            throw new DomainValidationError( erros,"Operação Não Permitida ")
        }
        
        this._statusCarga = StatusCargaQuimica.Analise;
    }

    public inspecionar(): void{
        const erros: DomainError[] = []
         
        if(this._statusCarga !== StatusCargaQuimica.Analise){
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Carga não está em Análise"})
            throw new DomainValidationError( erros,"Operação Não Permitida ")
        }
        
        this._statusCarga = StatusCargaQuimica.Inspecao;
    }
    
    public  bloquear(): void{
        const erros: DomainError[] = []
         
        if(this._statusCarga === StatusCargaQuimica.Inspecao){
            this._statusCarga = StatusCargaQuimica.Bloqueada
        } else {
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Carga não está em Inspeção"})
            throw new DomainValidationError( erros,"Operação Não Permitida ")
        }
    }

    public liberar(): void{
        const erros: DomainError[] = []
         
        const documentoCompleto = this.documentoObrigatorio.certificadoTransporteProdutosPerigoso 
            && this.documentoObrigatorio.declaracaoExpedidor
            && this.documentoObrigatorio.fichaDadosSeguranca
            && this.documentoObrigatorio.notaFiscal>0;
        
        if(this._statusCarga !== StatusCargaQuimica.Inspecao){
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Carga não está em Inspeção"})
            throw new DomainValidationError( erros, "Operação Não Permitida ");
        };

        if(!documentoCompleto){
            erros.push({code: "MISSING_DOCUMENT", field: "documentoObrigatorio", message:"Impossível liberar, há documentos faltando"})
            throw new DomainValidationError( erros, "Operação Não Permitida ");
        };

        this._statusCarga = StatusCargaQuimica.Liberada;      
    }

    public movimentar(): void{
        const erros: DomainError[] = []
        if(this._statusCarga !== StatusCargaQuimica.Liberada){
             erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Impossível movimentar, a carga não está liberada"})
            throw new DomainValidationError( erros, "Operação Não Permitida ");
        }

        this._statusCarga = StatusCargaQuimica.Movimentacao
    }

    public finalizar(): void{
        const erros: DomainError[] = [];
        if(this._statusCarga !== StatusCargaQuimica.Movimentacao){
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Impossível finalizar, a carga não está em movimentação"});
            throw new DomainValidationError( erros, "Operação Não Permitida ");
        }

        this._statusCarga = StatusCargaQuimica.Finalizada;
    }

    public cancelar(): void{
         const erros: DomainError[] = [];
        if(this._statusCarga === StatusCargaQuimica.Finalizada){
            erros.push({code: "INVALID_OPERATION", field: "statusCarga", message:"Impossível cancelar, a carga está finalizada"});
            throw new DomainValidationError( erros, "Operação Não Permitida ");
        }

        this._statusCarga = StatusCargaQuimica.Cancelada;
    }

    public alterarDados(novoCodigoCarga: string,
    novaQuantidade: number,
    novaUnidadeMedida: UnidadeDeMedida,
    novaOrigem: string,
    novoDestino: string,
    novoResponsavelTecnico: string): void {

        validarAlteracaoCarga(novoCodigoCarga, novaQuantidade, novaUnidadeMedida, novaOrigem, novoDestino, novoResponsavelTecnico);
        this.codigoCarga = novoCodigoCarga;
        this.quantidade = novaQuantidade;
        this.unidadeMedida = novaUnidadeMedida;
        this.origem = novaOrigem;
        this.destino = novoDestino;
        this.responsavelTecnico = novoResponsavelTecnico;

    }
    
    
}

// const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(10, false, true, true), StatusCargaQuimica.Inspecao);            
// // // novaCarga.bloquear()
// // novaCarga.liberar()
// novaCarga.movimentar();

