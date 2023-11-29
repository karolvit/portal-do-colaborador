

CREATE TRIGGER insert_codigo_funcionario
AFTER INSERT ON dados_pessoais
FOR EACH ROW 
BEGIN
  INSERT INTO complemento (codigo_funcionario) VALUES (NEW.codigo_funcionario);
  INSERT INTO login (codigo_funcionario, senha) VALUES (NEW.codigo_funcionario, '123');
  INSERT INTO usuario (codigo_funcionario) VALUES (NEW.codigo_funcionario);
END;

-- Se fazer via terminal precisa adicionar o delimiter


CREATE TRIGGER delete_codigo_funcionario
AFTER DELETE ON dados_pessoais 
FOR EACH ROW 

BEGIN 

	DELETE FROM complemento WHERE codigo_funcionario = OLD.codigo_funcionario;
  DELETE FROM usuario WHERE codigo_funcionario = OLD.codigo_funcionario;
  DELETE FROM login WHERE codigo_funcionario = OLD.codigo_funcionario;

END;


CREATE TRIGGER update_usuairo 
BEFORE UPDATE ON dados_pessoais
FOR EACH ROW 

BEGIN
	UPDATE login
  SET usuario = New.usuario
  where usuario = OLD.usuario;
  
 END;