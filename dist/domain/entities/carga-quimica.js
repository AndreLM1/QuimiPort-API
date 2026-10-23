import { StatusCargaQuimica } from "../enums/status-carga-quimica.enum.js";
import { UnidadeDeMedida } from "../enums/unidade-de-medida.enum.js";
import { validarCriacaoCarga } from "../errors/carga-quimica.validation.js";
import { DomainValidationError } from "../errors/domain-validation.error.js";
import { DocumentoObrigatorio } from "./documentoObrigatorio.js";
export class CargaQuimica {
    codigoCarga;
    produtoQuimicoId;
    quantidade;
    unidadeMedida;
    origem;
    destino;
    responsavelTecnico;
    documentoObrigatorio;
    dataEntrada;
    dataCriacao;
    dataAtualizacao;
    id;
    constructor(codigoCarga, produtoQuimicoId, quantidade, unidadeMedida, origem, destino, responsavelTecnico, documentoObrigatorio, dataEntrada, dataCriacao, dataAtualizacao, id) {
        this.codigoCarga = codigoCarga;
        this.produtoQuimicoId = produtoQuimicoId;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.origem = origem;
        this.destino = destino;
        this.responsavelTecnico = responsavelTecnico;
        this.documentoObrigatorio = documentoObrigatorio;
        this.dataEntrada = dataEntrada;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.id = id;
        this.validarDados();
    }
    validarDados() {
        validarCriacaoCarga(this.produtoQuimicoId, this.quantidade, this.responsavelTecnico);
    }
    _statusCarga = StatusCargaQuimica.Registrada;
    get statusCarga() {
        return this._statusCarga;
    }
    analisar() {
        const erros = [];
        if (this._statusCarga !== StatusCargaQuimica.Registrada) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Carga não está registrada" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        this._statusCarga = StatusCargaQuimica.Analise;
    }
    inspecionar() {
        const erros = [];
        if (this._statusCarga !== StatusCargaQuimica.Analise) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Carga não está na etapa de Análise" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        this._statusCarga = StatusCargaQuimica.Inspecao;
    }
    bloquear() {
        const erros = [];
        if (this._statusCarga === StatusCargaQuimica.Inspecao) {
            this._statusCarga = StatusCargaQuimica.Bloqueada;
        }
        else {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Impossível bloquear, verifique o status atual da carga." });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
    }
    liberar() {
        const erros = [];
        const documentoCompleto = this.documentoObrigatorio.certificadoTransporteProdutosPerigoso
            && this.documentoObrigatorio.declaracaoExpedidor
            && this.documentoObrigatorio.fichaDadosSeguranca
            && this.documentoObrigatorio.notaFiscal > 0;
        if (this._statusCarga !== StatusCargaQuimica.Inspecao) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Impossível liberar, verifique o status atual da carga." });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        ;
        if (!documentoCompleto) {
            erros.push({ code: "MISSING_DOCUMENT", field: "documentoObrigatorio", message: "Impossível liberar, há documentos faltando" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        ;
        this._statusCarga = StatusCargaQuimica.Liberada;
    }
    movimentar() {
        const erros = [];
        if (this._statusCarga !== StatusCargaQuimica.Liberada) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Impossível movimentar, a carga não está liberada" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        this._statusCarga = StatusCargaQuimica.Movimentacao;
    }
    finalizar() {
        const erros = [];
        if (this._statusCarga !== StatusCargaQuimica.Movimentacao) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Impossível finalizar, a carga não está em movimentação" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        this._statusCarga = StatusCargaQuimica.Finalizada;
    }
    cancelar() {
        const erros = [];
        if (this._statusCarga !== StatusCargaQuimica.Bloqueada) {
            erros.push({ code: "INVALID_OPERATION", field: "statusCarga", message: "Impossível cancelar, a carga não está bloqueada" });
            throw new DomainValidationError(erros, "Operação Não Permitida ");
        }
        this._statusCarga = StatusCargaQuimica.Cancelada;
    }
}
// const novaCarga = new CargaQuimica("CQ-A24", 1, 10, UnidadeDeMedida.kg, "China", "São Paulo", "Andre ", new DocumentoObrigatorio(10, false, true, true), StatusCargaQuimica.Inspecao);            
// // // novaCarga.bloquear()
// // novaCarga.liberar()
// novaCarga.movimentar();
//# sourceMappingURL=carga-quimica.js.map