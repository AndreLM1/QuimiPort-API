import { produtoQuimicoRepositoryMock, findByIdMock } from "@/application/mocks/produto-quimico-repository.mock.js";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { cargaQuimicaRepositoryMock } from "@/application/mocks/carga-quimica-repository.mock.js";
import { RegistrarCargaQuimicaUseCase } from "../registrar-carga.use-case.js";
import { UnidadeDeMedida } from "@/domain/enums/unidade-de-medida.enum.js";
import { DocumentoObrigatorio } from "@/domain/entities/documentoObrigatorio.js";
import { ProdutoQuimico } from "@/domain/entities/produto-quimico.js";
import { NumeroOnu } from "@/domain/entities/numero-onu.js";
import { ClasseRisco } from "@/domain/enums/classe-de-risco.enum.js";
import { StatusProduto } from "@/domain/enums/status-produto.enum.js";
import { GrupoCompatibilidade } from "@/domain/enums/grupo-compatibilidade.enum.js";
import { CargaQuimica } from "@/domain/entities/carga-quimica.js";


describe("Validation Use Case", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Deve lançar erro quando o produto químico não existir", async () => {

        // Prepara o mock para simular uma busca sem resultado
        produtoQuimicoRepositoryMock.findById;

        // Instancia o Use Case passando os 2 mocks
        const useCase = new RegistrarCargaQuimicaUseCase(produtoQuimicoRepositoryMock, cargaQuimicaRepositoryMock);

        // Inputando os dados falsos da interface InputRegistrarCargaQuimicaDto
        const input = {
            codigoCarga: "A-4030",
            produtoQuimicoId: 10,
            quantidade: 4,
            unidadeMedida: UnidadeDeMedida.kg,
            origem: "Portugal",
            destino: "São Paulo",
            responsavelTecnico: "André Marques",
            documentoObrigatorio: new DocumentoObrigatorio(144, true, true, true)
        };

        // Executa o caso de uso, chamando o método excute dele e passando o input como parâmetro.
        await expect(useCase.execute(input)).rejects.toThrow("Produto não encontrado");

        // Garante que a carga não foi enviada para a persistência
        expect(cargaQuimicaRepositoryMock.registrar).not.toHaveBeenCalled();

        // Confirma que a consulta do produto foi feita com o id do input
        expect(produtoQuimicoRepositoryMock.findById).toHaveBeenCalledWith(10);
    });



    it("Deve lançar erro quando o produto químico for inativo", async () => {

        // ARRANGE — Preparação do cenário de teste.

        // Cria uma instância real de ProdutoQuimico com os dados necessários.
        // O primeiro argumento é o ID do produto: 1.
        // Os demais argumentos representam os atributos exigidos pelo construtor.
        const produto = new ProdutoQuimico(1, "Gasolina", new NumeroOnu("1345"), "Combustível líquido e inflamável", ClasseRisco.Classe1, StatusProduto.Ativo, new Date(2026, 10, 21), GrupoCompatibilidade.b, new Date(2026, 10, 21))


        // Altera o status do produto para inativo.
        // Assim, conseguimos simular um produto existente que não pode
        // ser associado a uma nova carga química.
        produto.statusProduto = StatusProduto.Inativo;

        // Configura o mock para que a consulta do produto retorne
        // a instância criada acima, em vez de retornar undefined.
        // O método retorna uma Promise resolvida com o produto.
        findByIdMock.mockResolvedValue(produto);

        // Cria uma instância do caso de uso.
        // Os repositórios mockados são injetados no construtor
        // no lugar dos repositórios reais.
        const useCase = new RegistrarCargaQuimicaUseCase(produtoQuimicoRepositoryMock, cargaQuimicaRepositoryMock);


        // Monta os dados de entrada exigidos pelo DTO
        // InputRegistrarCargaQuimicaDto.
        const input = {
            codigoCarga: "B-2342",
            produtoQuimicoId: produto.id,
            quantidade: 4,
            unidadeMedida: UnidadeDeMedida.kg,
            origem: "Portugal",
            destino: "São Paulo",
            responsavelTecnico: "André Marques",
            documentoObrigatorio: new DocumentoObrigatorio(144, true, true, true)
        };


        // ACT + ASSERT — Executa o caso de uso e verifica o resultado.
        // O await aguarda a verificação da Promise.
        // A expectativa é que execute(input) seja rejeitada
        // com o erro informado, pois o produto está inativo.
        await expect(useCase.execute(input)).rejects.toThrow("Produto Químico inativo, não pode ser associado à uma Carga Química");

        // Confirma que a consulta do produto foi feita com o id do input
        expect(produtoQuimicoRepositoryMock.findById).toHaveBeenCalledWith(produto.id);
        // Confirma que a carga não foi enviada para a persistência
        expect(cargaQuimicaRepositoryMock.registrar).not.toHaveBeenCalled();
    })


    it("O use case Registrar Carga deve retornar a promise com a instancia da Carga Quimica com produto ativo", async () =>{
        // ARRANGE — Preparação do cenário de teste.

        // Cria uma instância real de ProdutoQuimico com os dados necessários.
        // O primeiro argumento é o ID do produto: 1.
        // Os demais argumentos representam os atributos exigidos pelo construtor.
        const produto = new ProdutoQuimico(1, "Gasolina", new NumeroOnu("1345"), "Combustível líquido e inflamável", ClasseRisco.Classe1, StatusProduto.Ativo, new Date(2026, 10, 21), GrupoCompatibilidade.b, new Date(2026, 10, 21))


        // Configura o mock para que a consulta do produto retorne
        // a instância criada acima, em vez de retornar undefined.
        // O método retorna uma Promise resolvida com o produto.
        findByIdMock.mockResolvedValue(produto);

        // Cria uma instância do caso de uso.
        // Os repositórios mockados são injetados no construtor
        // no lugar dos repositórios reais.
        const useCase = new RegistrarCargaQuimicaUseCase(produtoQuimicoRepositoryMock, cargaQuimicaRepositoryMock);


        // Monta os dados de entrada exigidos pelo DTO
        // InputRegistrarCargaQuimicaDto.
        const input = {
            codigoCarga: "B-2342",
            produtoQuimicoId: produto.id,
            quantidade: 4,
            unidadeMedida: UnidadeDeMedida.kg,
            origem: "Portugal",
            destino: "São Paulo",
            responsavelTecnico: "André Marques",
            documentoObrigatorio: new DocumentoObrigatorio(144, true, true, true)
        };


        // ACT + ASSERT — Executa o caso de uso e verifica o resultado.
        // O await aguarda a verificação da Promise.
        // A expectativa é que execute(input) seja resolvida
        await expect(useCase.execute(input)).resolves.toBeInstanceOf(CargaQuimica)

        // Confirma que a consulta do produto foi feita com o id do input
        expect(produtoQuimicoRepositoryMock.findById).toHaveBeenCalledWith(produto.id);
        // Confirma que a carga não foi enviada para a persistência
        expect(cargaQuimicaRepositoryMock.registrar).toHaveBeenCalled();
    })
});