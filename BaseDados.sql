create database mygym;
use mygym;

-- Usuarios table


create table Usuarios(
    id int not null auto_increment primary key,
    nome varchar(255),
    email varchar(255) unique not null,
    telefone varchar(255),
    senha varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_nascimento date,
    role ENUM('user', 'admin') DEFAULT 'user'
);

insert INTO Usuarios(nome,created_at,data_nascimento,email,telefone,senha,role) values
('José Sbaraini','2025-04-15 20:47:28','2007-04-03', "josesbarainips@gmail.com","(99) 99999-9999",
'$2b$10$qGL2HbPN4Tc8Z2ZKX7Zc3.d97UYfM8UGb.PKWGdIHfTyIU4BqU5n6','admin'),
('Beatriz Baltazar','2025-04-15 20:47:28','2007-04-03',"algumacoisa@gmail.com","(88) 88888-8888",
'$2b$10$K3ey15y6t6YVnw4UM5tFhuOZkE/D778URPOj/fzKN316kohJBisi.','admin');
-- Treinos table

/*
insert into Treinos(modificacao_em,nome,descricao,anotacoes,Usuario_id) values
('2025-04-10 15:30:45','bisepis','Um terino bem treinoso ai','',1);
drop table Treinos;
select * from Treinos;
*/
create table Treinos(
    id int not null auto_increment primary key,
    modificacao_em DATETIME,
    nome varchar(255),
    descricao varchar(255),
    anotacoes varchar(255),
    Usuario_id int,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
/*
insert into Passos(nome,repeticoes,peso,series,Treino_id) values
('bipis', 3 , 2.2 ,15, 1);
drop table Passos;
select * from Passos;
*/
-- Passo table
create table Passos(
    id int not null auto_increment primary key,
    nome varchar(255),
    repeticoes varchar(255),
    peso DOUBLE,
    series int,
    Treino_id int,
    FOREIGN KEY (Treino_id) REFERENCES Treinos(id)
);
/*
insert into Eventos(nome,descricao,data,Usuario_id) values
('Dia ai', 'um dia como qualquer outro' , '2025-04-10', 1);
drop table Eventos;
select * from Eventos;
*/

-- Evento table
create table Eventos(
    Usuario_id int not NULL,
    nome varchar(255),
    descricao varchar(255),
    data DATE,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);
/*
insert into Dados_basicos(altura,peso,Usuario_id) values
(1.8, 66.2, 1);
drop table Dados_basicos;
select * from Dados_basicos;
*/
-- Dados_basicos table
create table Dados_basicos(
    altura DOUBLE,
    peso DOUBLE,
    Usuario_id int not null unique,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);

/*
insert into Dados_avancados(imc,meta_base,Usuario_id) values
(1.8, 66.2, 1);
drop table Dados_avancados;
select * from Dados_avancados;
*/
-- Dados_avancados table
create table Dados_avancados(
    imc DOUBLE,
    meta_base DOUBLE,
    biotipo varchar(45),
    Usuario_id int not null unique,
    FOREIGN KEY (Usuario_id) REFERENCES Usuarios(id)
);


/*

$2b$10$qGL2HbPN4Tc8Z2ZKX7Zc3.d97UYfM8UGb.PKWGdIHfTyIU4BqU5n6

$2b$10$K3ey15y6t6YVnw4UM5tFhuOZkE/D778URPOj/fzKN316kohJBisi.
*/