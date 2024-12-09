--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: connections; Type: TABLE; Schema: public; Owner: teste
--

CREATE TABLE public.connections (
    id integer NOT NULL,
    origin_id integer NOT NULL,
    destination_id integer NOT NULL,
    distance integer NOT NULL
);


ALTER TABLE public.connections OWNER TO teste;

--
-- Name: connections_id_seq; Type: SEQUENCE; Schema: public; Owner: teste
--

CREATE SEQUENCE public.connections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.connections_id_seq OWNER TO teste;

--
-- Name: connections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teste
--

ALTER SEQUENCE public.connections_id_seq OWNED BY public.connections.id;


--
-- Name: eventos; Type: TABLE; Schema: public; Owner: teste
--

CREATE TABLE public.eventos (
    id integer NOT NULL,
    tipo character varying(10) NOT NULL,
    titulo character varying(50) NOT NULL,
    descricao text,
    data date,
    id_locals integer,
    "time" time without time zone,
    CONSTRAINT eventos_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['sala'::character varying, 'evento'::character varying])::text[])))
);


ALTER TABLE public.eventos OWNER TO teste;

--
-- Name: eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: teste
--

CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eventos_id_seq OWNER TO teste;

--
-- Name: eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teste
--

ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;


--
-- Name: locals; Type: TABLE; Schema: public; Owner: teste
--

CREATE TABLE public.locals (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.locals OWNER TO teste;

--
-- Name: users; Type: TABLE; Schema: public; Owner: teste
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO teste;

--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: teste
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_id_seq OWNER TO teste;

--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teste
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.users.id;


--
-- Name: connections id; Type: DEFAULT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.connections ALTER COLUMN id SET DEFAULT nextval('public.connections_id_seq'::regclass);


--
-- Name: eventos id; Type: DEFAULT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Data for Name: connections; Type: TABLE DATA; Schema: public; Owner: teste
--

COPY public.connections (id, origin_id, destination_id, distance) FROM stdin;
3	1001	1002	19
4	1002	1003	19
5	1003	1004	19
6	1004	1005	22
7	1005	1006	19
8	1006	1007	19
9	1007	1008	19
10	1008	1009	22
11	1009	1010	19
12	1010	1011	19
13	1011	1012	19
14	1012	1013	22
15	1013	1014	19
16	1014	1015	19
17	1015	1016	19
18	1016	1001	22
\.


--
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: teste
--

COPY public.eventos (id, tipo, titulo, descricao, data, id_locals, "time") FROM stdin;
83	sala	Aula Elaine	Nesta aula introdutória sobre o Trello, você aprenderá como usar esta poderosa ferramenta de gerenciamento de tarefas para organizar e acompanhar suas atividades de forma eficiente. O Trello é uma plataforma de quadros e cartões que permite visualizar e gerenciar suas tarefas de maneira clara e intuitiva.	2023-11-10	1001	\N
84	evento	ECCI - Banca de Aprovação	Banca de Aprovação para finalistas do ECCi	2023-11-14	1002	\N
86	sala	Algoritmos	Aula de introdução de Algoritmos apresentada por Andre Helena	2023-11-22	1003	\N
88	sala	Metodologias Agéis	Aula de introdução de Algoritmos apresentada por Andre Helena.	2023-11-19	1001	\N
89	sala	Programação Web	Apresentado por Prof, Alexandre	2023-11-09	1002	\N
90	sala	Programação Web	Apresentado por Prof, Alexandre	2023-11-09	1002	\N
93	evento	Evento de Tecnologia	Descrição do evento	2023-11-18	1001	\N
97	evento	tets	tets	2023-11-21	1003	\N
98	evento	tets	tets	2023-11-21	1003	\N
99	sala	teste 2	teste 2	2023-11-09	1005	\N
100	sala	Teste3	Teste3	2023-11-08	1015	\N
101	sala	Teste3	Teste3	2023-11-08	1015	\N
102	sala	teste4	teste4	2023-11-16	1012	\N
103	sala	teste5	teste5	2023-11-22	1001	\N
104	sala	teste6	teste6	2023-11-22	1003	\N
105	sala	teste10	teste10	2024-02-29	1005	\N
106	evento	aula da prof Elaine	Materia de tcc	2024-03-01	1004	\N
\.


--
-- Data for Name: locals; Type: TABLE DATA; Schema: public; Owner: teste
--

COPY public.locals (id, name) FROM stdin;
1001	Sala 1001
1002	Sala 1002
1003	Sala 1003
1004	Sala 1004
1005	Sala 1005
1006	Sala 1006
1007	Sala 1007
1008	Sala 1008
1009	Sala 1009
1010	Sala 1010
1011	Sala 1011
1012	Sala 1012
1013	Sala 1013
1014	Sala 1014
1015	Sala 1015
1016	Sala 1016
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: teste
--

COPY public.users (id, username, password) FROM stdin;
1	rafael	123456
\.


--
-- Name: connections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teste
--

SELECT pg_catalog.setval('public.connections_id_seq', 18, true);


--
-- Name: eventos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teste
--

SELECT pg_catalog.setval('public.eventos_id_seq', 106, true);


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teste
--

SELECT pg_catalog.setval('public.login_id_seq', 1, true);


--
-- Name: connections connections_pkey; Type: CONSTRAINT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- Name: locals locals_pkey; Type: CONSTRAINT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.locals
    ADD CONSTRAINT locals_pkey PRIMARY KEY (id);


--
-- Name: users login_pkey; Type: CONSTRAINT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_id_locals_fkey; Type: FK CONSTRAINT; Schema: public; Owner: teste
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_id_locals_fkey FOREIGN KEY (id_locals) REFERENCES public.locals(id);


--
-- PostgreSQL database dump complete
--

