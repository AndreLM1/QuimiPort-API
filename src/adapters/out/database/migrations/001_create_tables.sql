---------------- Criacao dos ENUMs -------------------
CREATE TYPE classe_de_risco AS ENUM(
    'Classe 1 - Explosivos',
    'Classe 2 - Gases',
    'Classe 3 - Líquidos Inflamáveis',
    'Classe 4 - Sólidos Inflamáveis',
    'Classe 5 - Substâncias Oxidantes e Peróxidos',
    'Classe 6 - Substâncias Tóxicas e Infectantes',
    'Classe 7 - Materiais Radioativos',
    'Classe 8 - Substâncias Corrosivas',
    'Classe 9 - Substâncias e Artigos Perigosos Diversos'
);

CREATE TYPE status_produto AS ENUM(
    'ATIVO',
    'INATIVO'
);

CREATE TYPE grupo_de_compatibilidade AS ENUM(
    'Grupo X',
    'Grupo A',
    'Grupo B',
    'Grupo C',
    'Grupo D'
);

CREATE TYPE unidade_de_medida AS ENUM(
    'Quilograma',
    'Grama',
    'Tonelada',
    'Litro',
    'Mililitro',
    'Metro cubico'
);

CREATE TYPE status_carga AS ENUM(
    'Registrada',
    'Em análise',
    'Em inspeção',
    'Liberada',
    'Bloqueada',
    'Cancelada',
    'Em movimentação',
    'Finalizada' 
);
---------------- Fim Criacao dos ENUMs -------------------

---------------- Criacao das Tabelas -------------------
-- Criar tabela Produto Químico
CREATE TABLE produtoquimico (
    ProdutoId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    NumeroOnu VARCHAR(4) CHECK (NumeroOnu ~ '^[0-9]{4}$') NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    ClasseRisco classe_de_risco NOT NULL,
    StatusProduto status_produto NOT NULL DEFAULT 'ATIVO',
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    GrupoCompatibilidade grupo_de_compatibilidade NOT NULL,
    DataAlteracao TIMESTAMP
);

CREATE TABLE cargaquimica (
    CargaId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ProdutoId INT REFERENCES produtoquimico (ProdutoId) NOT NULL,
    CodigoCarga VARCHAR(255) NOT NULL UNIQUE,
    Quantidade NUMERIC CHECK(Quantidade > 0) NOT NULL,
    UnidadeMedida unidade_de_medida NOT NULL,
    Origem VARCHAR(255) NOT NULL,
    Destino VARCHAR(255) NOT NULL,
    ResponsavelTecnico VARCHAR(255) NOT NULL,
    NotaFiscal INT NOT NULL,
    DeclaracaoExpedidor BOOLEAN NOT NULL,
    FichaDadosSeguranca BOOLEAN NOT NULL,
    CertificadoTransporteProdutosPerigosos BOOLEAN NOT NULL,
    DataEntrada TIMESTAMP,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    StatusCarga status_carga DEFAULT 'Registrada' NOT NULL,
    DataAtualizacao TIMESTAMP
);

---------------- Fim Criacao das Tabelas -------------------

--  Função para atualizar a coluna DataAlteracao quando hover um update na tabela produto
CREATE OR REPLACE FUNCTION atualizar_data_produto()
RETURNS TRIGGER AS $$
BEGIN
    New.DataAlteracao:= CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- Trigger para chamar a função atualizar_data_produto
CREATE TRIGGER trg_atualiza_data_produto
BEFORE UPDATE on produtoquimico
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_produto();

--  Função para atualizar a coluna DataAlteracao quando hover um update na tabela produto
CREATE OR REPLACE FUNCTION atualizar_data_carga()
RETURNS TRIGGER AS $$
BEGIN
    New.DataAtualizacao:= CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- Trigger para chamar a função atualizar_data_produto
CREATE TRIGGER trg_atualiza_data_carga
BEFORE UPDATE on cargaquimica
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_carga();