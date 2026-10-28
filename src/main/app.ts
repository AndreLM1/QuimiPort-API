import fastify from "fastify";
import { registerErrorHandler } from "../adapters/in/http/error-handler.js"
import { DatabaseConnection } from "@/adapters/out/database/postgres/database.js";
import { ProdutoQuimicoSqlRepository } from "@/adapters/out/database/repositories/produto-quimico.repository.js";
import { CargaQuimicaSqlRepository } from "@/adapters/out/database/repositories/carga-quimica.repository.js";
import { RegistrarCargaQuimicaUseCase } from "@/application/use-cases/carga-quimica/registrar-carga.use-case.js";
import { CargaQuimicaController } from "@/adapters/in/http/controller/carga-quimica.controller.js";
import { cargaQuimicaRoutes } from "@/adapters/in/http/routes/carga-quimica.routes.js";
import { produtoQuimicoRoutes } from "@/adapters/in/http/routes/produto-quimico.routes.js";
import { ProdutoQuimicoController } from "@/adapters/in/http/controller/produto-quimico.controller.js";
import { RegistrarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/registrar-produto.use-case.js";
import { ListarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/listar-produto.use-case.js";
import { BuscarProdutoQuimicoPorIdUseCase } from "@/application/use-cases/produto-quimico/listar-id-produto.use-case.js";
import { InativarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/inativar-produto.use-case.js";
import { AlterarProdutoQuimicoUseCase } from "@/application/use-cases/produto-quimico/alterar-produto.use-case.js";


//-------------  Instância do Fastify -------------
const app = fastify();

//------------- Registro do Erro Handler -------------
registerErrorHandler(app);

//-------------  Instância dos repositories -------------
const produtoRepository = new ProdutoQuimicoSqlRepository(DatabaseConnection);
const cargaRepository = new CargaQuimicaSqlRepository(DatabaseConnection);

//-------------  Instância dos Casos de Uso -------------
const registrarCargaUseCase = new RegistrarCargaQuimicaUseCase(
    produtoRepository,
    cargaRepository
);

const registrarProdutoQuimicoUseCase = new RegistrarProdutoQuimicoUseCase(produtoRepository);
const listarProdutoQuimicoUseCase = new ListarProdutoQuimicoUseCase(produtoRepository);
const buscarProdutoQuimicoPorIdUseCase = new BuscarProdutoQuimicoPorIdUseCase(produtoRepository);
const inativarProdutoQuimicoUseCase = new InativarProdutoQuimicoUseCase(produtoRepository);
const alterarProdutoQuimicoUseCase = new AlterarProdutoQuimicoUseCase(produtoRepository);

//------------- Instância Controller -------------   
const cargaController = new CargaQuimicaController(registrarCargaUseCase);

const produtoController = new ProdutoQuimicoController(
    registrarProdutoQuimicoUseCase,
    listarProdutoQuimicoUseCase,
    buscarProdutoQuimicoPorIdUseCase,
    inativarProdutoQuimicoUseCase,
    alterarProdutoQuimicoUseCase
)






// Rotas Carga Quimica
app.register(async (instance) => {
    await cargaQuimicaRoutes(instance, cargaController);
});


// Rotas Produto Quimico
app.register(async (instance) => {
    await produtoQuimicoRoutes(instance, produtoController)
})


//------------- Início do Servidor
app.listen({ port: 3000 }, () => {
    console.log("Server runing on PORT: 3000")
})
