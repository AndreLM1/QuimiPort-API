import type { InputRegistrarProdutoQuimicoDto } from "@/application/dtos/registrar-produto-quimico.dto.js";
import type { BuscarProdutoQuimicoPorIdUseCase } from "@/application/use-cases/produto-quimico/listar-id-produto.use-case.js";
import type { ListarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/listar-produto.use-case.js";
import type { RegistrarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/registrar-produto.use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class ProdutoQuimicoController {
    constructor(
        private readonly registrarProduto: RegistrarProdutoQuimicoUseCase,
        private readonly findAllProdutos: ListarProdutoQuimicoUseCase,
        private readonly findById: BuscarProdutoQuimicoPorIdUseCase
    ) { }

    public async registrar(request: FastifyRequest<{
        Body: InputRegistrarProdutoQuimicoDto
    }>, reply: FastifyReply) {
        const input = request.body;

        const produto = await this.registrarProduto.execute(input);
        return reply.code(201).send(produto);
    };

    public async findAll(request: FastifyRequest, reply: FastifyReply) {
        const produtos = await this.findAllProdutos.execute();
        return reply.code(200).send(produtos);
    };

    public async findId(request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        const id = Number(request.params.id)
        console.log(id)
        const produtos = await this.findById.execute(id);
        return reply.code(200).send(produtos);
    }
}