--
-- PostgreSQL database dump
--

\restrict aKgcX1x5LhICIJk56NZ026dwiYMuWsPUON9Fl5ll5cvtJJifV9h9MwfdAAErNu6

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Debian 18.6-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: classe_de_risco; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.classe_de_risco AS ENUM (
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


ALTER TYPE public.classe_de_risco OWNER TO admin;

--
-- Name: grupo_de_compatibilidade; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.grupo_de_compatibilidade AS ENUM (
    'Grupo X',
    'Grupo A',
    'Grupo B',
    'Grupo C',
    'Grupo D'
);


ALTER TYPE public.grupo_de_compatibilidade OWNER TO admin;

--
-- Name: status_carga; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.status_carga AS ENUM (
    'Registrada',
    'Em análise',
    'Em inspeção',
    'Liberada',
    'Bloqueada',
    'Cancelada',
    'Em movimentação',
    'Finalizada'
);


ALTER TYPE public.status_carga OWNER TO admin;

--
-- Name: status_produto; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.status_produto AS ENUM (
    'ATIVO',
    'INATIVO'
);


ALTER TYPE public.status_produto OWNER TO admin;

--
-- Name: unidade_de_medida; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.unidade_de_medida AS ENUM (
    'Quilograma',
    'Grama',
    'Tonelada',
    'Litro',
    'Mililitro',
    'Metro cubico'
);


ALTER TYPE public.unidade_de_medida OWNER TO admin;

--
-- Name: atualizar_data_carga(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.atualizar_data_carga() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    New.DataAtualizacao:= CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_data_carga() OWNER TO admin;

--
-- Name: atualizar_data_produto(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.atualizar_data_produto() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    New.DataAlteracao:= CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_data_produto() OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cargaquimica; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cargaquimica (
    cargaid integer NOT NULL,
    produtoid integer NOT NULL,
    codigocarga character varying(255) NOT NULL,
    quantidade numeric NOT NULL,
    unidademedida public.unidade_de_medida NOT NULL,
    origem character varying(255) NOT NULL,
    destino character varying(255) NOT NULL,
    responsaveltecnico character varying(255) NOT NULL,
    notafiscal integer NOT NULL,
    declaracaoexpedidor boolean NOT NULL,
    fichadadosseguranca boolean NOT NULL,
    certificadotransporteprodutosperigosos boolean NOT NULL,
    dataentrada timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    datacriacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    statuscarga public.status_carga DEFAULT 'Registrada'::public.status_carga NOT NULL,
    dataatualizacao timestamp without time zone,
    CONSTRAINT cargaquimica_quantidade_check CHECK ((quantidade > (0)::numeric))
);


ALTER TABLE public.cargaquimica OWNER TO admin;

--
-- Name: cargaquimica_cargaid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.cargaquimica ALTER COLUMN cargaid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cargaquimica_cargaid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: produtoquimico; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.produtoquimico (
    produtoid integer NOT NULL,
    nome character varying(255) NOT NULL,
    numeroonu character varying(4) NOT NULL,
    descricao character varying(255) NOT NULL,
    classerisco public.classe_de_risco NOT NULL,
    statusproduto public.status_produto DEFAULT 'ATIVO'::public.status_produto NOT NULL,
    datacriacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    grupocompatibilidade public.grupo_de_compatibilidade NOT NULL,
    dataalteracao timestamp without time zone,
    CONSTRAINT produtoquimico_numeroonu_check CHECK (((numeroonu)::text ~ '^[0-9]{4}$'::text))
);


ALTER TABLE public.produtoquimico OWNER TO admin;

--
-- Name: produtoquimico_produtoid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.produtoquimico ALTER COLUMN produtoid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.produtoquimico_produtoid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: cargaquimica; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.cargaquimica (cargaid, produtoid, codigocarga, quantidade, unidademedida, origem, destino, responsaveltecnico, notafiscal, declaracaoexpedidor, fichadadosseguranca, certificadotransporteprodutosperigosos, dataentrada, datacriacao, statuscarga, dataatualizacao) FROM stdin;
1	3	TESTE 01	10	Quilograma	Brasil	Alemanha	Douglas	12340	t	t	t	2026-10-31 10:33:16.301823	2026-10-31 10:33:16.301823	Finalizada	2026-11-02 11:17:34.740455
2	5	TESTE 02	20	Quilograma	string	string	string	1230	t	t	t	2026-11-02 11:19:14.556495	2026-11-02 11:19:14.556495	Cancelada	2026-11-02 11:20:04.680631
3	5	TESTE 03	20	Quilograma	string	string	string	1230	t	t	t	2026-11-02 11:20:50.880453	2026-11-02 11:20:50.880453	Cancelada	2026-11-02 11:26:18.947944
4	5	TESTE 04	20	Quilograma	string	string	string	1230	t	t	t	2026-11-02 11:25:04.474726	2026-11-02 11:25:04.474726	Cancelada	2026-11-02 11:27:12.663621
5	5	TESTE 05	20	Quilograma	string	string	string	1230	t	t	t	2026-11-02 11:27:27.164768	2026-11-02 11:27:27.164768	Cancelada	2026-11-02 11:28:37.559276
6	5	TESTE 06	20	Quilograma	string	string	string	1230	t	t	t	2026-11-02 11:29:14.303775	2026-11-02 11:29:14.303775	Cancelada	2026-11-02 11:30:55.582102
\.


--
-- Data for Name: produtoquimico; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.produtoquimico (produtoid, nome, numeroonu, descricao, classerisco, statusproduto, datacriacao, grupocompatibilidade, dataalteracao) FROM stdin;
1	Acetona	1090	Solvente utilizado em processos industriais	Classe 3 - Líquidos Inflamáveis	INATIVO	2026-10-24 15:33:54.311449	Grupo X	2026-10-27 16:37:15.293221
2	Ácido clorídrico atualizado	1789	Produto químico utilizado em processos industriais	Classe 8 - Substâncias Corrosivas	INATIVO	2026-10-27 10:36:47.390966	Grupo A	2026-10-28 11:35:55.59788
3	Pasta de Dente	1445	Produto químico corrosivo	Classe 5 - Substâncias Oxidantes e Peróxidos	ATIVO	2026-10-30 10:23:14.586042	Grupo D	\N
5	Petróleo	1123	Líquido viscoso inflamável	Classe 1 - Explosivos	ATIVO	2026-10-30 12:50:46.669614	Grupo A	\N
4	Teste 1000	1233	teste	Classe 1 - Explosivos	INATIVO	2026-10-30 12:50:01.556771	Grupo X	2026-10-30 14:45:21.556355
\.


--
-- Name: cargaquimica_cargaid_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cargaquimica_cargaid_seq', 6, true);


--
-- Name: produtoquimico_produtoid_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.produtoquimico_produtoid_seq', 5, true);


--
-- Name: cargaquimica cargaquimica_codigocarga_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cargaquimica
    ADD CONSTRAINT cargaquimica_codigocarga_key UNIQUE (codigocarga);


--
-- Name: cargaquimica cargaquimica_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cargaquimica
    ADD CONSTRAINT cargaquimica_pkey PRIMARY KEY (cargaid);


--
-- Name: produtoquimico produtoquimico_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.produtoquimico
    ADD CONSTRAINT produtoquimico_pkey PRIMARY KEY (produtoid);


--
-- Name: cargaquimica trg_atualiza_data_carga; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER trg_atualiza_data_carga BEFORE UPDATE ON public.cargaquimica FOR EACH ROW EXECUTE FUNCTION public.atualizar_data_carga();


--
-- Name: produtoquimico trg_atualiza_data_produto; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER trg_atualiza_data_produto BEFORE UPDATE ON public.produtoquimico FOR EACH ROW EXECUTE FUNCTION public.atualizar_data_produto();


--
-- Name: cargaquimica cargaquimica_produtoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cargaquimica
    ADD CONSTRAINT cargaquimica_produtoid_fkey FOREIGN KEY (produtoid) REFERENCES public.produtoquimico(produtoid);


--
-- PostgreSQL database dump complete
--

\unrestrict aKgcX1x5LhICIJk56NZ026dwiYMuWsPUON9Fl5ll5cvtJJifV9h9MwfdAAErNu6

