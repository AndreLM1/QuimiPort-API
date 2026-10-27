import { ProdutoQuimico } from "../../../../domain/entities/produto-quimico.js";
import { NumeroOnu } from "../../../../domain/entities/numero-onu.js";
export class ProdutoQuimicoSqlRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    ;
    //  findById
    async findById(id) {
        const query = `SELECT * FROM produtoquimico WHERE produtoid= $1`;
        const { rows } = await this.db.query(query, [id]);
        const produtoProcurado = rows[0];
        if (!produtoProcurado) {
            return undefined;
        }
        ;
        return new ProdutoQuimico(produtoProcurado.nome, new NumeroOnu(produtoProcurado.numeroonu), produtoProcurado.descricao, produtoProcurado.classerisco, produtoProcurado.statusproduto, produtoProcurado.grupocompatibilidade, produtoProcurado.datacriacao, produtoProcurado.dataalteracao, produtoProcurado.produtoid);
    }
    // Registrar
    async registrar(produtoQuimico) {
        const query = `INSERT INTO produtoquimico (
        nome,
        numeroonu, 
        descricao,
        classerisco,
        statusproduto,
        grupocompatibilidade)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
        const values = [
            produtoQuimico.nome,
            produtoQuimico.numeroOnu.codigo,
            produtoQuimico.descricao,
            produtoQuimico.classeRisco,
            produtoQuimico.statusProduto,
            produtoQuimico.grupoCompatibilidade
        ];
        const { rows } = await this.db.query(query, values);
        const produtoSalvo = rows[0];
        const novoProduto = new ProdutoQuimico(produtoSalvo.nome, new NumeroOnu(produtoSalvo.numeroonu), produtoSalvo.descricao, produtoSalvo.classerisco, produtoSalvo.statusproduto, produtoSalvo.grupocompatibilidade, produtoSalvo.datacriacao, produtoSalvo.dataalteracao, produtoSalvo.produtoid);
        return novoProduto;
    }
    ;
    //  Listar 
    async findAll() {
        const query = `SELECT * FROM produtoquimico`;
        const { rows } = await this.db.query(query);
        const produtos = [];
        // Percorrendo a query
        for (const results of rows) {
            //  Convertendo cada linha em uma instância de ProdutoQuimico
            const produto = new ProdutoQuimico(results.nome, new NumeroOnu(results.numeroonu), results.descricao, results.classerisco, results.statusproduto, results.grupocompatibilidade, results.datacriacao, results.dataalteracao, results.produtoid);
            produtos.push(produto);
        }
        ;
        return produtos;
    }
    ;
}
;
//# sourceMappingURL=produto-quimico.repository.js.map