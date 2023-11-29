const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const jwtSecret = 'token';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    done(null, payload);
  })
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'portal_colaborador',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
  // ROTAS 

  // ROTA REGISTER PRECISA SE ADAPTAR A TABLE USUÁRIO 
  // FAZER DISPARADOR NO BANCO
app.post('/register' ,async (req, res) => {  
  
  const { codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo,
    escolaridade, estado_civil, nacionalidade, ddd_1, celular_1, ddd_2, celular_2, pcd, usuario, senha } = req.body;
  let perfilImgPath = null;
  
  if (!senha) {
    return res.status(400).json({ success: false, errors: ['É necessário ter senha', error] });
  } 
  
  if (req.file) {
    perfilImgPath = req.file.path;
  } else {
    perfilImgPath = './assets/defauth.png'
  }
  
  const hashedsenha = await bcrypt.hash(senha, 10);
  
  const routeNorm = perfilImgPath.replace(/\\/g, '/');
  const values = [hashedsenha, codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo, escolaridade, estado_civil, nacionalidade, ddd_1, celular_1, ddd_2, celular_2, pcd, usuario, routeNorm]

  db.query('INSERT INTO dados_pessoais (senha, codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo, escolaridade, estado_civil, nacionalidade, ddd_1, celular_1, ddd_2, celular_2, pcd, usuario, foto_perfil ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, errors: 'Erro ao cadastrar usuário', err });
    } else {
      res.json({ success: true, errors: 'Usuário cadastrado com sucesso' });
    }
  });

  app.use('./assets', express.static(path.join( './assets')));

});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  const notifier = require('node-notifier');

  const notification = {
    title: 'Teste',
    nessage: 'Error'
  };

  const query = 'SELECT * FROM dados_pessoais WHERE usuario = ?';
  
  if (senha === '123') {
    res.status(200).json({ success: true, errors: ['Senha padrão detectada. Recomendamos que você a altere.'] });
    alert 
    return;
  }

  db.query(query, [usuario], async (err, results) => {
    if (err) {
      res.status(500).json({ success: false, errors: ['Erro no Banco de Dados'] });
    } else if (results.length === 1) {
      const user = results[0];

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (isPasswordValid) {
        const payload = { id: user.id, usuario: user.usuario };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        res.json({ success: true, token: token });
      } else {
        res.status(401).json({ success: false, errors: ['Falha na Autenticação'] });
      }
    } else {
      res.status(401).json({ success: false, errors: ['Usuário não encontrado'] });
      notifier.notify(notification);
    }
  });



});

  
app.get('/painel', (req, res) => {
    const query = 'SELECT * FROM login';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});  


        // Em Desenvolvimento - (Criar rotas de buscar o usuário (codigo do funcionário e nome completo) - obs: nome completo usando like 
  

app.get('/post', (req, res) => {
  db.query('SELECT * FROM postagem', (err, results) => {
    if (err) {
      console.error('Erro ao buscar postagens no banco', err);
      res.status(500).json({ errors: 'Erro ao buscar postagem' });
    } else {
      res.json(results);
    }
  });
});

  const multer = require('multer');
const { error } = require('console');
const { escape } = require('querystring');

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
  });

  const upload = multer({ storage: storage })

  

app.post('/post', upload.single('img'), (req, res) => {
  
    const { titulo, descricao, setor, usuario } = req.body;
    let imgPath = null;
    

    if (req.file) {
      imgPath = req.file.path;
    }


    if (!titulo) {
      return (
        res.status(400).json({ errors: 'Titulo não pode ser vazio' })
      );
    } else if (!setor || !usuario) {
      return (
        res.status(500).json({ error: "Erro no servidor"})
      )
    }

    
    const normRoute = imgPath.replace(/\\/g, '/');
    const values = [titulo, descricao, setor, usuario, normRoute];

    const newPost = {
      titulo,
      descricao,
      usuario,
      setor,
      img: normRoute
    }
    
    db.query('INSERT INTO postagem ( titulo, descricao, setor, usuario, img) values (? ,? ,? ,?,?)', values, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro na postagem ', err});
      } else {
        newPost.id_postagem = result.insertId
        return res.status(201).json(newPost)
      }
    })

  })

  app.use('/assets', express.static(path.join( './assets'))) // ROTA PARA SALVAR O UPLOAD DOS POSTS

  app.delete("/post/delete/:id", (req, res) => {
    
    const deleteQuery = 'DELETE FROM postagem WHERE id_postagem = ?'

    const postId = req.params.id;

    db.query(deleteQuery, [postId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao deletar post', err });
      } else if (result.affectedRows === 0) {
        res.status(400).json({ error: 'Post não encontrado'});
      } else {
        res.status(200).json({ message: 'Post deletado' });
      }
    });

  });
  
app.put("/post/update/:id"), upload.single('img'), (req, res) => {

    const postId = req.params.id;
    const { titulo, descricao, setor, usuario} = req.body;
    
    let imgPath = req.file.path;

    if (req.file) {
      imgPath = req.file.path;
    }

    if (!titulo) {
      return res.status(400).json({ error: 'O titulo não pode está em branco '})
    } else if (!setor || !usuario) {
      return res.status(428).json({ error: 'Erro no servidor '})
    }

    const updatePost = {
      titulo,
      descricao,
      setor,
      usuario,
      img: imgPath
    }

    db.query('UPDATE postagem SET ? WHERE = ?', [updatePost, postId], (err) => {
      if (err) {
        console.error('Erro ao atualizar postagem', err);
        res.status(500).json({ error: "Erro ao atualizar postagem"})
      } else {
        res.status(200).json({ error: 'Postagem atualizada com sucesso'})
      }
    })
}

app.put('/dadospessoais/update/:id'), async (req, res) => {
	const { usuario, senha, foto_perfil} = req.body;
	const id = req.params.id;

	if (!usuario && !senha && !foto_perfil) {
		return res.status(400).json({ error: ' Erro ao atualizar dados '})
	}

	let updateFields = '';
	let values = []

	if(usuario) {
		updateFields += 'usuario = ? '
		values.push(usuario);
	}

	if (senha) {
		updateFields += 'senha = ? '
		values.push(senha);
	}

	if (foto_perfil) {
		updateFields += 'foto_perfil = ?'
		values.push(foto_perfil)
	}

	const updateString = updateFields.replace(', ');
	values.push(id)

	const query = `UPDATE dados_pessoais SET ${updateString} WHERE id = ?`;

	db.query(query, values, (err, result) => {
		if (err) {
			console.error('Erro ao atualizar dados pessoais, err');
			res.status(500).json({ error: 'Erro ao atualizar dados pessoais'});
		} else {
			if (result.affectedRows === 0) {
				res.status(404).json({ error: 'Usuário não encontrado'});
			} else {
				let message = 'Dados pessoais atualizado';
				if (result.changedRows === 0) {
					message = 'Nenhum dado foi alterado'
				}
			}
		}
	})

}

app.get('/dadospessoais/:codigo_funcionario', (req, res) => {
	const codigo_funcionario = req.params.codigo_funcionario;
	const query = 'SELECT codigo_funcionario, usuario, senha, setor, funcao FROM dados_pessoais WHERE codigo_funcionario = ?';

	db.query(query, [codigo_funcionario], (err, results) => {
		if (err) {
			console.error('Erro ao buscar dados do usuário', err);
			res.status(500).json({ error: 'Erro ao buscar dados pessoais'})
		} else {
			if (results.length ===0) {
				res.status(404).json({ error: "Usuário n encontrado"});
			} else {
				const userData = results[0]
				res.status(200).json(userData)
			}
		}
	})
})

// teste

app.get('/dado', passport.authenticate('jwt', { session: false}), (req, res) => {
  const user = req.user;
  const userId = user.codigo_funcionario;

  db.query('SELECT * FROM dados_pessoais WHERE codigo_funcionario = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: ['Erro ao buscar usuário']})
    } else if (results === 1) {
      const dadosUser = results[0]
      res.status(200).json({ success: true, user: dadosUser})
    } else {
      res.status(404).json({ sucess: false, error: ['Usuário não encontrado']})
    }
  })
})

////////////////////// Teste ///////////////

app.put('/meuperfil/update', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado '})
  }

  const {codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo, escolaridade, estado_civil,
          nacionalidade, ddd_1, ddd_2, celular_1, celular_2, pcd, senha, foto_perfil
  } = req.body;

  const fieldsToUpdate = { codigo_funcionario, empresa, nome, cpf, nascimento, setor, funcao, email, sexo, escolaridade, estado_civil,
                           nacionalidade, ddd_1, ddd_2, celular_1, celular_2, pcd, senha, foto_perfil
  }

  let updateFields = '';
  const values = [];
  
  for (const key in fieldsToUpdate) {
    if (fieldsToUpdate[key] !== undefined) {
      updateFields += `${key} = ?`;
      values.push(fieldsToUpdate[key]);
    }
  }

  if (values.length === 0) {
    return res.status(400).json({ error: 'nenhum dado fornecido'})
  }

  values.push(user.codigo_funcionario);

  const updateString = updateFields.replace(/,\s*$/, '');
  const query = `UPDATE dados_pessoais SET ${updateString} WHERE codigo_funcionario = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao att dados', err)
      res.status(500).json({ error: 'Erro ao atualizar dados do perfil'})
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Erro ao atualizar dados do perfil'})
      } else {
        let message = 'Dados do perfil atualizados';
        if (result.changedRows === 0) {
          message = 'Nenhum ado foi alterado'
        }
        res.status(200).json({ message});
      }
    }
  })
})

/////////////////////////
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
