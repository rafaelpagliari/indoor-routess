PGDMP     %    +        	        |            indoor_routes %   12.22 (Ubuntu 12.22-0ubuntu0.20.04.1) %   12.22 (Ubuntu 12.22-0ubuntu0.20.04.1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    indoor_routes    DATABASE        CREATE DATABASE indoor_routes WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE indoor_routes;
                postgres    false            �           0    0    DATABASE indoor_routes    ACL     .   GRANT ALL ON DATABASE indoor_routes TO teste;
                   postgres    false    2965            �            1259    16386    connections    TABLE     �   CREATE TABLE public.connections (
    id integer NOT NULL,
    origin_id integer NOT NULL,
    destination_id integer NOT NULL,
    distance integer NOT NULL
);
    DROP TABLE public.connections;
       public         heap    teste    false            �            1259    16389    connections_id_seq    SEQUENCE     �   CREATE SEQUENCE public.connections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.connections_id_seq;
       public          teste    false    202            �           0    0    connections_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.connections_id_seq OWNED BY public.connections.id;
          public          teste    false    203            �            1259    16391    eventos    TABLE     z  CREATE TABLE public.eventos (
    id integer NOT NULL,
    tipo character varying(10) NOT NULL,
    titulo character varying(50) NOT NULL,
    descricao text,
    data date,
    id_locals integer,
    "time" time without time zone,
    CONSTRAINT eventos_tipo_check CHECK (((tipo)::text = ANY (ARRAY[('sala'::character varying)::text, ('evento'::character varying)::text])))
);
    DROP TABLE public.eventos;
       public         heap    teste    false            �            1259    16398    eventos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.eventos_id_seq;
       public          teste    false    204            �           0    0    eventos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;
          public          teste    false    205            �            1259    16400    locals    TABLE     b   CREATE TABLE public.locals (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.locals;
       public         heap    teste    false            �            1259    16403    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    teste    false            �            1259    16409    login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.login_id_seq;
       public          teste    false    207            �           0    0    login_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.login_id_seq OWNED BY public.users.id;
          public          teste    false    208            �
           2604    16411    connections id    DEFAULT     p   ALTER TABLE ONLY public.connections ALTER COLUMN id SET DEFAULT nextval('public.connections_id_seq'::regclass);
 =   ALTER TABLE public.connections ALTER COLUMN id DROP DEFAULT;
       public          teste    false    203    202            �
           2604    16412 
   eventos id    DEFAULT     h   ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);
 9   ALTER TABLE public.eventos ALTER COLUMN id DROP DEFAULT;
       public          teste    false    205    204                       2604    16413    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          teste    false    208    207            �          0    16386    connections 
   TABLE DATA           N   COPY public.connections (id, origin_id, destination_id, distance) FROM stdin;
    public          teste    false    202   Y       �          0    16391    eventos 
   TABLE DATA           W   COPY public.eventos (id, tipo, titulo, descricao, data, id_locals, "time") FROM stdin;
    public          teste    false    204   �       �          0    16400    locals 
   TABLE DATA           *   COPY public.locals (id, name) FROM stdin;
    public          teste    false    206   "       �          0    16403    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          teste    false    207   �"       �           0    0    connections_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.connections_id_seq', 18, true);
          public          teste    false    203            �           0    0    eventos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.eventos_id_seq', 106, true);
          public          teste    false    205            �           0    0    login_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.login_id_seq', 2, true);
          public          teste    false    208                       2606    16415    connections connections_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.connections DROP CONSTRAINT connections_pkey;
       public            teste    false    202                       2606    16417    eventos eventos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.eventos DROP CONSTRAINT eventos_pkey;
       public            teste    false    204                       2606    16419    locals locals_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.locals
    ADD CONSTRAINT locals_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.locals DROP CONSTRAINT locals_pkey;
       public            teste    false    206            	           2606    16421    users login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT login_pkey;
       public            teste    false    207            
           2606    16422    eventos eventos_id_locals_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_id_locals_fkey FOREIGN KEY (id_locals) REFERENCES public.locals(id);
 H   ALTER TABLE ONLY public.eventos DROP CONSTRAINT eventos_id_locals_fkey;
       public          teste    false    206    204    2823            �   l   x�-��D1�s(fdgO/��:'��gYH�
j����Ⰰ�8-`�Zc=�j�,�c[�0��e�P�}5�&s3�{��l�?s��8M�ɼL�^�m����~���':      �   9  x��T�n�0�u_�`���T^Ia'��4n���B@"e���M�"p� _��Ryg�����ŭF3���yd���0��-
I�-���#�ժ��[�4��;Mm�.`T����$k��w�T�`0�a����AhHk�Hr�&8�P���\â����>�� �(��30 �E�5�Z�t�@��3�>��`z���-Z\P�f7L[���&yzҝ��`�v�W]o�Y:�$�f�:����m�%Y�i�&Q�$it���n�������e5�9�Z�8��~���F#${�,Y[s��J�T�Ye�.�=*-l�̲Ϛ�J� �ތ�I�6�� k��{jIbP�2���*�E冬�U���]�ӓ�g����Sv��I�#��5�������\�}EGȒ2DT&��,[���J.�D��TZ�(X�a�}��|�y,Y�����|�l���G���|�K�`�&�% ��tE��Ffg��/a�Cf2?C^���ȥ�8C�|y�p�<�	�_���-�$����w>���s����n;w1U�J��ɜt���/�
��      �   ^   x�=Ϋ�@CQͫ�
���~��b����b29������z�&�Y<�S,f�Y�f6��]��9I?I��P�BU�
U�*T��P���}D��4�      �   9   x�3�,JLKL��442615�2�LM)M,J��K,J,��G�rs����BH�=... ���     