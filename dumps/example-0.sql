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

--
-- Name: tickets_invoices_status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.tickets_invoices_status_enum AS ENUM (
    'OPEN',
    'CLOSED',
    'CANCELED'
);


ALTER TYPE public.tickets_invoices_status_enum OWNER TO root;

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
    active boolean DEFAULT true NOT NULL,
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
-- Name: tickets_categories; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.tickets_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets_categories OWNER TO root;

--
-- Name: tickets_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.tickets_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_categories_id_seq OWNER TO root;

--
-- Name: tickets_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.tickets_categories_id_seq OWNED BY public.tickets_categories.id;


--
-- Name: tickets_invoices; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.tickets_invoices (
    id integer NOT NULL,
    tickets_category_id integer NOT NULL,
    customer_user_id integer NOT NULL,
    employer_user_id integer,
    name character varying NOT NULL,
    description text,
    status public.tickets_invoices_status_enum DEFAULT 'OPEN'::public.tickets_invoices_status_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets_invoices OWNER TO root;

--
-- Name: tickets_invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.tickets_invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_invoices_id_seq OWNER TO root;

--
-- Name: tickets_invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.tickets_invoices_id_seq OWNED BY public.tickets_invoices.id;


--
-- Name: tickets_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.tickets_items (
    id integer NOT NULL,
    tickets_invoice_id integer NOT NULL,
    parts_item_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets_items OWNER TO root;

--
-- Name: tickets_items_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.tickets_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_items_id_seq OWNER TO root;

--
-- Name: tickets_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.tickets_items_id_seq OWNED BY public.tickets_items.id;


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
-- Name: tickets_categories id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_categories ALTER COLUMN id SET DEFAULT nextval('public.tickets_categories_id_seq'::regclass);


--
-- Name: tickets_invoices id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_invoices ALTER COLUMN id SET DEFAULT nextval('public.tickets_invoices_id_seq'::regclass);


--
-- Name: tickets_items id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_items ALTER COLUMN id SET DEFAULT nextval('public.tickets_items_id_seq'::regclass);


--
-- Data for Name: parts_categories; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.parts_categories (id, name, description, active, created_at, updated_at) FROM stdin;
2	fdgdfgfdggdgd	sdgsgdgsgs	t	2025-03-08 12:20:21.048002	2025-03-08 12:20:21.048002
3	fdgdfgdfg	fdgdfgdf	t	2025-03-08 15:00:50.407568	2025-03-08 15:00:50.407568
\.


--
-- Data for Name: parts_items; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.parts_items (id, parts_category_id, name, description, active, created_at, updated_at) FROM stdin;
2	3	fdgdfgdgd	fdgdfgdg	t	2025-03-08 15:01:02.515514	2025-03-08 15:01:02.515514
3	2	fdgdfgdfg	4234	t	2025-03-08 15:06:32.093828	2025-03-08 15:06:32.093828
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
14	\N	test41	$argon2id$v=19$m=65536,t=3,p=4$wcj7v46bqs1/P7lxq/zGuw$SWJsIdn06oz7OdqeqB/39eWTnc2TZHOfs3M+N7iunHg	test41@gmail.com	\N	11111	111111	t	2025-03-16 10:39:01.126858	2025-03-16 12:00:09.843978
1	1	user	$argon2id$v=19$m=65536,t=3,p=4$baHD4gwvWvO5ESaF45OFAA$/o9+CiBDzr2BfVTzEtAtN3XwFPWEAFIqLNEl9qo7Ot0	user@example.com	+79372222222	user	user	t	2025-02-25 15:18:22.965051	2025-02-25 15:18:22.965051
3	\N	user11223433	$argon2id$v=19$m=65536,t=3,p=4$WgTABGOZ/C83+ql2yicKQg$HrXBOvLwGIYfpjoLDwiqhQ2RH5tKVznBPeLeAuTzQd4	user1146745@example.com	+79372243213	user	user	f	2025-03-01 11:50:24.830046	2025-03-01 11:50:24.830046
4	\N	user@example.com	$argon2id$v=19$m=65536,t=3,p=4$indEUvHgSysY0T+1hBxGag$+eyxytWuWU65cgxwNHjv7NFR1xcDu8vPJ6uhwmW4B8Y	fyfyyfyfyfyfyfyf@yandex.ru	+79372224444	\N		f	2025-03-01 12:14:33.800466	2025-03-01 12:14:33.800466
5	\N	user1112	$argon2id$v=19$m=65536,t=3,p=4$Q6fRF7BbESSZMbKv7t8/zw$x0ZICABnCCTNaZ78NFyqw27xfNlV34t/wsGHTFJJSQU	user1121@example.com	+79372222244	user	user	f	2025-03-01 12:24:39.222345	2025-03-01 12:24:39.222345
6	\N	tfvtvtyvgytg	$argon2id$v=19$m=65536,t=3,p=4$kAB2y8JRhw5lyv3PVHOf7Q$Tw1ZhZ8KMxf310PrxypKxHKh+5UnILa4cZadZad5WfA	Sunrise55g+106775@gmail.com	+79991199999	\N		f	2025-03-01 12:33:32.198911	2025-03-01 12:33:32.198911
7	\N	tfvtvt4356yvgytg	$argon2id$v=19$m=65536,t=3,p=4$7TGHAygm8I/iN+48LqOAww$ohnallwDrD8R+8VTU3NU/YNuJ+q+2iY6kRtzYYrNrAI	Sunris55e55g+1055@gmail.com	\N	\N	\N	f	2025-03-01 12:37:17.469494	2025-03-01 12:37:17.469494
8	\N	43534564657rtyhfytfh	$argon2id$v=19$m=65536,t=3,p=4$8jtzj4KuQCeR9mIhqbGhIg$3E+5ZpFdInizYeKPLImoFqY1VTKz767F696gRkCvv1I	Sunrise435455g+105@gmail.com	\N	\N	\N	f	2025-03-01 12:45:19.169167	2025-03-01 12:45:19.169167
9	\N	dgbdgbdgbdb111	$argon2id$v=19$m=65536,t=3,p=4$B2i4JGCB75DL30j3FHe4kg$JpEJ6Lhvsj2hcLlAvyX1Y9IXmHVsyz+he/mrBOfIFQM	Sunrise55g+10115@gmail.com	+79372221244			f	2025-03-06 14:29:00.875093	2025-03-06 14:29:00.875093
16	1	21312fsergzrgerg	$argon2id$v=19$m=65536,t=3,p=4$FkiDVpPUAxFJyunyDajTdQ$LNwkC8/Vmv8fTvLUUvtr3cbnVN9HXsBzdNLmqCrTfDA	Sunrise55g+105544354@gmail.com	\N	\N	\N	t	2025-03-16 15:10:18.066013	2025-03-16 15:10:18.066013
2	\N	user111	$argon2id$v=19$m=65536,t=3,p=4$XCZ8SmwNf4DQ6D6DFIQtww$c7aWHbDqYQ7K9WN4RdbAEvgfdsmy5vN4mAUayumN3yE	user1111111111@example.com	+79372222243	user1112222222	user11122222222	f	2025-03-01 11:49:26.148898	2025-03-08 10:48:24.153921
15	\N	demo	$argon2id$v=19$m=65536,t=3,p=4$kxQy9MJ1TTva4N5egEqr/A$PwrlJkpAElMd8hjxDawQI0ZMca4muf9uQ3+KCLrRl0E	sunrise55g@gmail.com	\N	\N	\N	t	2025-03-16 11:30:41.409152	2025-03-16 11:30:41.409152
\.


--
-- Data for Name: tickets_categories; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.tickets_categories (id, name, description, active, created_at, updated_at) FROM stdin;
2	5t5t5t5t	5t5t5t5t	t	2025-03-15 09:10:19.690924	2025-03-15 09:10:19.690924
3	dsgsdgsdgsdg	sdgsgsdgsdggds	t	2025-03-15 12:36:30.864129	2025-03-15 12:36:30.864129
4	dsgdsgdsdsgsd	sdgsdgsdgsd	t	2025-03-15 12:36:38.976825	2025-03-15 12:36:38.976825
5	truturururtru	trutrurururtutrutrurt	t	2025-03-15 13:00:41.974791	2025-03-15 13:00:41.974791
1	Tickets Category 1222222222222	This is Tickets Category 133333333333333	t	2025-03-10 10:15:42.868832	2025-03-15 13:03:10.030397
\.


--
-- Data for Name: tickets_invoices; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.tickets_invoices (id, tickets_category_id, customer_user_id, employer_user_id, name, description, status, created_at, updated_at) FROM stdin;
23	2	8	9	2222222	333333333	CLOSED	2025-03-15 10:46:12.922621	2025-03-15 11:18:14.108551
24	5	14	\N	3432432423		OPEN	2025-03-16 13:21:02.852669	2025-03-16 13:21:02.852669
25	5	1	\N	inv 1	desc 1	OPEN	2025-03-16 14:04:54.589179	2025-03-16 14:04:54.589179
26	5	1	\N	43432432432432432432432	3r32r32r32	CLOSED	2025-03-16 14:17:49.468167	2025-03-16 14:18:10.11606
27	5	14	15	22222222222222222222222222222222	efewrfewfewfew	OPEN	2025-03-16 14:26:30.524817	2025-03-16 14:27:10.281682
28	1	6	16	vhdfgdh	fdghfdg	OPEN	2025-03-16 15:44:05.498552	2025-03-16 15:46:00.124764
\.


--
-- Data for Name: tickets_items; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.tickets_items (id, tickets_invoice_id, parts_item_id, created_at, updated_at) FROM stdin;
19	26	2	2025-03-16 14:46:15.910057	2025-03-16 14:46:15.910057
20	26	2	2025-03-16 14:46:25.83703	2025-03-16 14:46:25.83703
21	26	2	2025-03-16 14:46:26.01382	2025-03-16 14:46:26.01382
22	26	2	2025-03-16 14:46:26.185018	2025-03-16 14:46:26.185018
23	26	2	2025-03-16 14:46:26.361231	2025-03-16 14:46:26.361231
24	26	2	2025-03-16 14:46:26.520197	2025-03-16 14:46:26.520197
25	26	2	2025-03-16 14:46:26.685621	2025-03-16 14:46:26.685621
26	26	2	2025-03-16 14:46:26.925789	2025-03-16 14:46:26.925789
27	26	2	2025-03-16 14:46:27.063103	2025-03-16 14:46:27.063103
28	26	2	2025-03-16 14:46:27.195391	2025-03-16 14:46:27.195391
29	26	2	2025-03-16 14:46:27.361969	2025-03-16 14:46:27.361969
30	26	2	2025-03-16 14:49:25.298824	2025-03-16 14:49:25.298824
31	26	2	2025-03-16 14:49:27.48815	2025-03-16 14:49:27.48815
32	26	2	2025-03-16 14:49:28.357165	2025-03-16 14:49:28.357165
33	26	2	2025-03-16 14:49:29.049223	2025-03-16 14:49:29.049223
34	26	2	2025-03-16 14:49:29.632094	2025-03-16 14:49:29.632094
35	27	3	2025-03-16 15:04:30.54244	2025-03-16 15:04:30.54244
37	24	2	2025-03-16 15:04:44.142499	2025-03-16 15:04:44.142499
38	27	3	2025-03-16 15:04:58.288559	2025-03-16 15:04:58.288559
\.


--
-- Name: parts_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.parts_categories_id_seq', 3, true);


--
-- Name: parts_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.parts_items_id_seq', 3, true);


--
-- Name: profile_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.profile_roles_id_seq', 2, true);


--
-- Name: profile_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.profile_users_id_seq', 16, true);


--
-- Name: tickets_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.tickets_categories_id_seq', 5, true);


--
-- Name: tickets_invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.tickets_invoices_id_seq', 28, true);


--
-- Name: tickets_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.tickets_items_id_seq', 38, true);


--
-- Name: tickets_items PK_0b04e7865822eb784e6766936e0; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_items
    ADD CONSTRAINT "PK_0b04e7865822eb784e6766936e0" PRIMARY KEY (id);


--
-- Name: tickets_categories PK_0f08cb327b9526cb7910d468602; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_categories
    ADD CONSTRAINT "PK_0f08cb327b9526cb7910d468602" PRIMARY KEY (id);


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
-- Name: tickets_invoices PK_38415116223f1ccfe35fd05e14e; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_invoices
    ADD CONSTRAINT "PK_38415116223f1ccfe35fd05e14e" PRIMARY KEY (id);


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
-- Name: tickets_invoices FK_1d7eeff8302f7b875e558206de9; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_invoices
    ADD CONSTRAINT "FK_1d7eeff8302f7b875e558206de9" FOREIGN KEY (tickets_category_id) REFERENCES public.tickets_categories(id) ON DELETE CASCADE;


--
-- Name: tickets_invoices FK_33a2a340903bba37b5264e5d3d4; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_invoices
    ADD CONSTRAINT "FK_33a2a340903bba37b5264e5d3d4" FOREIGN KEY (customer_user_id) REFERENCES public.profile_users(id) ON DELETE CASCADE;


--
-- Name: tickets_items FK_5011f5076f230356d9a1f0db67b; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_items
    ADD CONSTRAINT "FK_5011f5076f230356d9a1f0db67b" FOREIGN KEY (tickets_invoice_id) REFERENCES public.tickets_invoices(id) ON DELETE CASCADE;


--
-- Name: tickets_invoices FK_903c87778a3ffbb245764a74146; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_invoices
    ADD CONSTRAINT "FK_903c87778a3ffbb245764a74146" FOREIGN KEY (employer_user_id) REFERENCES public.profile_users(id) ON DELETE CASCADE;


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
-- Name: tickets_items FK_ee0b49f32d638db0d0d8dfc5a53; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.tickets_items
    ADD CONSTRAINT "FK_ee0b49f32d638db0d0d8dfc5a53" FOREIGN KEY (parts_item_id) REFERENCES public.parts_items(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

