export class DocumentoObrigatorio{
    constructor(
        public notaFiscal: number,
        public declaracaoExpedidor: boolean,
        public fichaDadosSeguranca: boolean,
        public certificadoTransporteProdutosPerigoso: boolean
    ){}
}