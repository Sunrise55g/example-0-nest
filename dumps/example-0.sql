--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: parts_categories; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.parts_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.parts_categories OWNER TO root;

--
-- Name: parts_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.parts_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parts_categories_id_seq OWNER TO root;

--
-- Name: parts_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.parts_categories_id_seq OWNED BY public.parts_categories.id;


--
-- Name: parts_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.parts_items (
    id integer NOT NULL,
    parts_category_id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.parts_items OWNER TO root;

--
-- Name: parts_items_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.parts_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parts_items_id_seq OWNER TO root;

--
-- Name: parts_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.parts_items_id_seq OWNED BY public.parts_items.id;


--
-- Name: profile_roles; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.profile_roles (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    administrator boolean DEFAULT false NOT NULL,
    moderator boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profile_roles OWNER TO root;

--
-- Name: profile_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.profile_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_roles_id_seq OWNER TO root;

--
-- Name: profile_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.profile_roles_id_seq OWNED BY public.profile_roles.id;


--
-- Name: profile_users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.profile_users (
    id integer NOT NULL,
    profile_role_id integer,
    username character varying,
    password_hash character varying,
    email character varying,
    phone character varying,
    first_name character varying,
    last_name character varying,
    active boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profile_users OWNER TO root;

--
-- Name: profile_users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.profile_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_users_id_seq OWNER TO root;

--
-- Name: profile_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.profile_users_id_seq OWNED BY public.profile_users.id;


--
-- Name: parts_categories id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.parts_categories ALTER COLUMN id SET DEFAULT nextval('public.parts_categories_id_seq'::regclass);


--
-- Name: parts_items id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.parts_items ALTER COLUMN id SET DEFAULT nextval('public.parts_items_id_seq'::regclass);


--
-- Name: profile_roles id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_roles ALTER COLUMN id SET DEFAULT nextval('public.profile_roles_id_seq'::regclass);


--
-- Name: profile_users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users ALTER COLUMN id SET DEFAULT nextval('public.profile_users_id_seq'::regclass);


--
-- Data for Name: parts_categories; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.parts_categories (id, name, description, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: parts_items; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.parts_items (id, parts_category_id, name, description, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: profile_roles; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.profile_roles (id, name, description, administrator, moderator, active, created_at, updated_at) FROM stdin;
1	Administrator	This is Administrator	t	t	t	2025-02-25 15:20:06.81897	2025-02-25 15:20:06.81897
\.


--
-- Data for Name: profile_users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.profile_users (id, profile_role_id, username, password_hash, email, phone, first_name, last_name, active, created_at, updated_at) FROM stdin;
1	1	user	$argon2id$v=19$m=65536,t=3,p=4$baHD4gwvWvO5ESaF45OFAA$/o9+CiBDzr2BfVTzEtAtN3XwFPWEAFIqLNEl9qo7Ot0	user@example.com	+79372222222	user	user	f	2025-02-25 15:18:22.965051	2025-02-25 15:18:22.965051
\.


--
-- Name: parts_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.parts_categories_id_seq', 1, false);


--
-- Name: parts_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.parts_items_id_seq', 1, false);


--
-- Name: profile_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.profile_roles_id_seq', 1, true);


--
-- Name: profile_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.profile_users_id_seq', 1, true);


--
-- Name: profile_users PK_0f15da96ad71bfbfb41242bab9f; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users
    ADD CONSTRAINT "PK_0f15da96ad71bfbfb41242bab9f" PRIMARY KEY (id);


--
-- Name: profile_roles PK_1ac977464025665f9ce83a667ba; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_roles
    ADD CONSTRAINT "PK_1ac977464025665f9ce83a667ba" PRIMARY KEY (id);


--
-- Name: parts_categories PK_703bab00c3488b741ea0155ce29; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.parts_categories
    ADD CONSTRAINT "PK_703bab00c3488b741ea0155ce29" PRIMARY KEY (id);


--
-- Name: parts_items PK_bddbc3dd5328f2315eaa19c9e97; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.parts_items
    ADD CONSTRAINT "PK_bddbc3dd5328f2315eaa19c9e97" PRIMARY KEY (id);


--
-- Name: profile_users UQ_09006bf33239043c3a62ed0aad8; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users
    ADD CONSTRAINT "UQ_09006bf33239043c3a62ed0aad8" UNIQUE (username);


--
-- Name: profile_users UQ_27b345ce7aa712c1774c9abaa1e; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users
    ADD CONSTRAINT "UQ_27b345ce7aa712c1774c9abaa1e" UNIQUE (email);


--
-- Name: profile_users UQ_e9db326ed8196241ae9d1f84db4; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users
    ADD CONSTRAINT "UQ_e9db326ed8196241ae9d1f84db4" UNIQUE (phone);


--
-- Name: parts_items FK_b9583766b718fd505cbffabc11b; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.parts_items
    ADD CONSTRAINT "FK_b9583766b718fd505cbffabc11b" FOREIGN KEY (parts_category_id) REFERENCES public.parts_categories(id) ON DELETE CASCADE;


--
-- Name: profile_users FK_c3fb0bfc3b2cfa0ce40adc7e3f4; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.profile_users
    ADD CONSTRAINT "FK_c3fb0bfc3b2cfa0ce40adc7e3f4" FOREIGN KEY (profile_role_id) REFERENCES public.profile_roles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

