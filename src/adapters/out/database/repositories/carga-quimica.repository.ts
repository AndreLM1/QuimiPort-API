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
    async findAll(): Promise<CargaQuimica[]> {
        const query = `SELECT * FROM cargaquimica;`

        const { rows } = await this.db.query(query);
        const cargas = [];

        for (const itens of rows) {
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
                itens.dataatualizacao,
                itens.cargaid,
                itens.statuscarga
            );
            cargas.push(carga);
        };
        return cargas;
    };

    // Find By Id
    async findById(id: number): Promise<CargaQuimica | undefined> {
        const query = `SELECT * FROM cargaquimica WHERE cargaid=$1;`

        const { rows } = await this.db.query(query, [id]);

        const cargaProcurada = rows[0];

        if (!cargaProcurada) {
            return undefined;
        };

        const documentoObrigatorio = new DocumentoObrigatorio(
            cargaProcurada.notafiscal,
            cargaProcurada.declaracaoexpedidor,
            cargaProcurada.fichadadosseguranca,
            cargaProcurada.certificadotransporteprodutosperigosos
        )

        return new CargaQuimica(
            cargaProcurada.codigocarga,
            cargaProcurada.produtoid,
            cargaProcurada.quantidade,
            cargaProcurada.unidademedida,
            cargaProcurada.origem,
            cargaProcurada.destino,
            cargaProcurada.responsaveltecnico,
            documentoObrigatorio,
            cargaProcurada.dataentrada,
            cargaProcurada.datacriacao,
            cargaProcurada.dataatualizacao,
            cargaProcurada.cargaid,
            cargaProcurada.statuscarga
        )
    }

    // Atualizar
    async atualizar(cargaQuimica: CargaQuimica): Promise<CargaQuimica | undefined> {
        const query = `UPDATE cargaquimica
         SET codigocarga= $1,
            quantidade= $2,
            unidademedida = $3,
            origem= $4,
            destino= $5,
            responsaveltecnico= $6
        WHERE cargaid= $7
        RETURNING*;`

        const values = [
            cargaQuimica.codigoCarga,
            cargaQuimica.quantidade,
            cargaQuimica.unidadeMedida,
            cargaQuimica.origem,
            cargaQuimica.destino,
            cargaQuimica.responsavelTecnico,
            cargaQuimica.id
        ];

        const { rows } = await this.db.query(query, values);
        const cargaAtualizada = rows[0];

        if (!cargaAtualizada) {
            return undefined
        }


        return new CargaQuimica(
            cargaAtualizada.codigocarga,
            cargaAtualizada.produtoid,
            cargaAtualizada.quantidade,
            cargaAtualizada.unidademedida,
            cargaAtualizada.origem,
            cargaAtualizada.destino,
            cargaAtualizada.responsaveltecnico,
            new DocumentoObrigatorio(
                cargaAtualizada.notafiscal,
                cargaAtualizada.declaracaoexpedidor,
                cargaAtualizada.fichadadosseguranca,
                cargaAtualizada.certificadotransporteprodutosperigosos
            ),
            cargaAtualizada.dataentrada,
            cargaAtualizada.datacriacao,
            cargaAtualizada.dataatualizacao,
            cargaAtualizada.cargaid,
            cargaAtualizada.statuscarga
        );
    }

    // Atualizar Status
    async atualizarStatus(cargaQuimica: CargaQuimica): Promise<CargaQuimica | undefined> {
        const query = `UPDATE cargaquimica 
        SET statuscarga=$1
        WHERE cargaid=$2
        RETURNING*;`
        const values = [
            cargaQuimica.statusCarga,
            cargaQuimica.id
        ];

        const { rows } = await this.db.query(query, values);

        const cargaAtualizada = rows[0];

        if (!cargaAtualizada) {
            return undefined
        };

        return new CargaQuimica(
            cargaAtualizada.codigocarga,
            cargaAtualizada.produtoid,
            cargaAtualizada.quantidade,
            cargaAtualizada.unidademedida,
            cargaAtualizada.origem,
            cargaAtualizada.destino,
            cargaAtualizada.responsaveltecnico,
            new DocumentoObrigatorio(
                cargaAtualizada.notafiscal,
                cargaAtualizada.declaracaoexpedidor,
                cargaAtualizada.fichadadosseguranca,
                cargaAtualizada.certificadotransporteprodutosperigosos
            ),
            cargaAtualizada.dataentrada,
            cargaAtualizada.datacriacao,
            cargaAtualizada.dataatualizacao,
            cargaAtualizada.cargaid,
            cargaAtualizada.statuscarga
        );
    }
}