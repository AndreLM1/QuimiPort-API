import fastify from "fastify";
import { registerErrorHandler } from "../adapters/in/http/error-handler.js"
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import { NumeroOnu } from "@/domain/entities/numero-onu.js";
import { ClasseRisco } from "@/domain/enums/classe-de-risco.enum.js";
import { StatusProduto } from "@/domain/enums/status-produto.enum.js";


const app = fastify();

registerErrorHandler(app);


app.listen({ port: 3000 }, () =>{
    console.log("Server runing on PORT: 3000")
})
