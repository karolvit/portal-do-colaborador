CREATE TABLE dados_pessoais (
	codigo_funcionario SMALLINT,
  empresa VARCHAR(100),
  nome VARCHAR(100),
  cpf BIGINT,
  nascimento date,
  setor VARCHAR(5),
  funcao VARCHAR(50),
  email VARCHAR(50),
  sexo CHAR(1),
  escolaridade SMALLINT,
  estado_civil VARCHAR(50),
  nacionalidade VARCHAR(15),
  ddd_1 SMALLINT,
  celular_1 INT,
  ddd_2 SMALLINT,
  celular_2 INT,
  pcd CHAR(1),
  usuario VARCHAR(25),
  senha VARCHAR(25)
);

INSERT INTO dados_pessoais(codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo, escolaridade, estado_civil, nacionalidade, ddd_1, celular_1, ddd_2, celular_2, pcd, usuario) values (1000, 'Baianao', 'KAROLINA VITORIA DE FREITAS ALMEIDA', 86352055532, '1999-02-19', 'TI', 'ASSS DE TI', 'karolinavit2@gmail.com' ,'F', 01, 'SOLTEIRO', 'BRASILEIRO', 71, 986491363, 71, 986491363, 'N', 'karolina', '123456');

CREATE TABLE complemento (
  codigo_funcionario SMALLINT,
  endereco VARCHAR(255), 
  cep INT,
  bairro VARCHAR(100),
  complemento VARCHAR(255),
  estado CHAR(2)
);