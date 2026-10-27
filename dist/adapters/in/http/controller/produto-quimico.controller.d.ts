import type { InputRegistrarProdutoQuimicoDto } from "../../../../application/dtos/registrar-produto-quimico.dto.js";
import type { InativarProdutoQuimicoUseCase } from "../../../../application/use-cases/produto-quimico/inativar-produto.use-case.js";
import type { BuscarProdutoQuimicoPorIdUseCase } from "../../../../application/use-cases/produto-quimico/listar-id-produto.use-case.js";
import type { ListarProdutoQuimicoUseCase } from "../../../../application/use-cases/produto-quimico/listar-produto.use-case.js";
import type { RegistrarProdutoQuimicoUseCase } from "../../../../application/use-cases/produto-quimico/registrar-produto.use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
export declare class ProdutoQuimicoController {
    private readonly registrarProduto;
    private readonly findAllProdutos;
    private readonly findById;
    private readonly inativarProduto;
    constructor(registrarProduto: RegistrarProdutoQuimicoUseCase, findAllProdutos: ListarProdutoQuimicoUseCase, findById: BuscarProdutoQuimicoPorIdUseCase, inativarProduto: InativarProdutoQuimicoUseCase);
    registrar(request: FastifyRequest<{
        Body: InputRegistrarProdutoQuimicoDto;
    }>, reply: FastifyReply): Promise<never>;
    findAll(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    findId(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    inativar(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=produto-quimico.controller.d.ts.map