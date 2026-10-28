import type { CargaQuimicaRepository } from "@/application/ports/out/carga-quimica-repository.js";
import { DatabaseConnection } from "../postgres/database.js"
import { CargaQuimica } from "@/domain/entities/carga-quimica.js";
import { DocumentoObrigatorio } from "@/domain/entities/documentoObrigatorio.js";

export class CargaQuimicaSqlRepository implements CargaQuimicaRepository {
    constructor(private readonly db: typeof DatabaseConnection) { };

    // Registrar  
    async registrar(cargaQuimica: CargaQuimica): Promise<CargaQuimica> {
        const query = `INSERT INTO cargaquimica (
        codigocarga,
        produtoid, 
        quantidade,
        unidademedida,
        origem,
        destino,
        responsaveltecnico,
        notafiscal,
        declaracaoexpedidor,
        fichadadosseguranca,
        certificadotransporteprodutosperigosos,
        statuscarga )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`

        const values = [
            cargaQuimica.codigoCarga,
            cargaQuimica.produtoQuimicoId,
            cargaQuimica.quantidade,
            cargaQuimica.unidadeMedida,
            cargaQuimica.origem,
            cargaQuimica.destino,
            cargaQuimica.responsavelTecnico,
            cargaQuimica.documentoObrigatorio.notaFiscal,
            cargaQuimica.documentoObrigatorio.declaracaoExpedidor,
            cargaQuimica.documentoObrigatorio.fichaDadosSeguranca,
            cargaQuimica.documentoObrigatorio.certificadoTransporteProdutosPerigoso,
            cargaQuimica.statusCarga
        ];


        const { rows } = await this.db.query(query, values);
        const cargaSalva = rows[0]

        const novaCarga = new CargaQuimica(
            cargaSalva.codigocarga,
            cargaSalva.produtoid,
            cargaSalva.quantidade,
            cargaSalva.unidademedida,
            cargaSalva.origem,
            cargaSalva.destino,
            cargaSalva.responsaveltecnico,
            new DocumentoObrigatorio(cargaSalva.notafiscal, cargaSalva.declaracaoexpedidor, cargaSalva.fichadadosseguranca, cargaSalva.certificadotransporteprodutosperigosos),
            cargaSalva.dataentrada,
            cargaSalva.datacriacao,
            cargaSalva.dataatualizacao,
            cargaSalva.cargaid
        );
        
        return novaCarga;
    };

    // Listar Todos
    async findAll(): Promise<CargaQuimica[]>{
        const query = `SELECT * FROM cargaquimica;`

        const { rows } = await this.db.query(query);
        const cargas = [];

        for(const itens of rows){
            const carga = new CargaQuimica(
                itens.codigocarga,
                itens.produtoid,
                itens.quantidade,
                itens.unidademedida,
                itens.origem,
                itens.destino,
                itens.responsaveltecnico,
                new DocumentoObrigatorio(
                    itens.notafiscal,
                    itens.declaracaoexpedidor,
                    itens.fichadadosseguranca,
                    itens.certificadotransporteprodutosperigosos
                ),
                itens.dataentrada,
                itens.datacriacao,
                itens.dataatualizacao
            );
            cargas.push(carga);
        };
        return cargas;
    };



}