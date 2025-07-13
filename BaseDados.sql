create table Usuarios(
    id int not null auto_increment primary key,
    nome varchar(255),
    email varchar(255) unique not null,
    telefone varchar(255),
    fotoPerfil varchar(255),
    senha varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_nascimento date,
    last_check DATE DEFAULT (CURRENT_DATE),
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE Notificacoes (
	id int not null auto_increment primary key,
    Usuario_id int not NULL,
    nome VARCHAR(255) NOT NULL,
    assunto VARCHAR(255) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    hora DATETIME NOT NULL default current_timestamp,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
create table Dados_basicos(
    altura INT,
    peso INT,
    Usuario_id int not null unique,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
create table Dados_avancados(
    imc int,
    metabasal int,
    biotipo varchar(45),
    Usuario_id int not null unique,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
create table Eventos(
	id int not null auto_increment primary key,
    Usuario_id int not NULL,
    nome varchar(255),
    descricao varchar(255),
    data DATE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
create table Treinos(
    id int not null auto_increment primary key,
    modificacao_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    nome varchar(255),
    descricao varchar(255),
    anotacoes varchar(255),
    Usuario_id int,
	data_treino DATE,
	repetir BOOLEAN DEFAULT FALSE,
	dia_semana ENUM(
    'domingo', 
    'segunda', 
    'terca', 
    'quarta', 
    'quinta', 
    'sexta', 
    'sabado'
	) DEFAULT NULL,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);


create table Passos(
    id int not null auto_increment primary key,
    nome varchar(255),
    repeticoes varchar(255),
    peso DOUBLE,
    series int,
    Treino_id int,
    FOREIGN KEY (Treino_id) REFERENCES Treinos(id)
);
