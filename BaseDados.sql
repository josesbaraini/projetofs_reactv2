create database mygym;
use mygym;
create table Usuarios(
id int not null auto_increment primary key,
nome varchar(255),
email varchar(255) unique not null,
telefone varchar(255),
senha varchar(255) not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
role ENUM('user', 'admin') DEFAULT 'user');


insert INTO Usuarios(nome,email,telefone,senha,role) values
('José Sbaraini', "josesbarainips@gmail.com","(99) 99999-9999",
'$2b$10$qGL2HbPN4Tc8Z2ZKX7Zc3.d97UYfM8UGb.PKWGdIHfTyIU4BqU5n6','admin'),
('Beatriz Baltazar', "algumacoisa@gmail.com","(88) 88888-8888",
'$2b$10$K3ey15y6t6YVnw4UM5tFhuOZkE/D778URPOj/fzKN316kohJBisi.','admin');

select * from Usuarios;
/*

$2b$10$qGL2HbPN4Tc8Z2ZKX7Zc3.d97UYfM8UGb.PKWGdIHfTyIU4BqU5n6

$2b$10$K3ey15y6t6YVnw4UM5tFhuOZkE/D778URPOj/fzKN316kohJBisi.
*/