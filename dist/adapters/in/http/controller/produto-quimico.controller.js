export class ProdutoQuimicoController {
    registrarProduto;
    findAllProdutos;
    findById;
    inativarProduto;
    alterarProduto;
    constructor(registrarProduto, findAllProdutos, findById, inativarProduto, alterarProduto) {
        this.registrarProduto = registrarProduto;
        this.findAllProdutos = findAllProdutos;
        this.findById = findById;
        this.inativarProduto = inativarProduto;
        this.alterarProduto = alterarProduto;
    }
    async registrar(request, reply) {
        const input = request.body;
        const produto = await this.registrarProduto.execute(input);
        return reply.code(201).send(produto);
    }
    ;
    async findAll(request, reply) {
        const produtos = await this.findAllProdutos.execute();
        return reply.code(200).send(produtos);
    }
    ;
    async findId(request, reply) {
        const id = Number(request.params.id);
        const produtos = await this.findById.execute(id);
        return reply.code(200).send(produtos);
    }
    async inativar(request, reply) {
        const id = Number(request.params.id);
        const produtos = await this.inativarProduto.execute(id);
        return reply.code(200).send(produtos);
    }
    async alterar(request, reply) {
        const id = Number(request.params.id);
        const input = request.body;
        const produtos = await this.alterarProduto.execute(id, input);
        return reply.code(200).send(produtos);
    }
}
//# sourceMappingURL=produto-quimico.controller.js.map