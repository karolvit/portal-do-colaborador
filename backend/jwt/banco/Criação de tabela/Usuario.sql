CREATE TABLE usuario (
    codigo_funcionario INT,
    codigo_perfil INT,
    situacao CHAR(1)
    FOREIGN KEY (codigo_funcionario)
    REFERENCES dados_pessoais(codigo_funcionario)
    ON DELETE CASCADE
);