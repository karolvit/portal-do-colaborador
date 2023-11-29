const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Configuração do servidor
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '585103Aa@',
  database: 'baianao',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Dados de exemplo (você usaria seu próprio banco de dados aqui)
const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'user1', password: 'password1' },
  { id: 3, username: 'user2', password: 'password2' },
];

// Rota para exibir o painel de administração
app.get('/admin', (req, res) => {
  // Certifique-se de que o usuário esteja autenticado como administrador (adicionar lógica de autenticação real)
  if (req.session.user && req.session.user.username === 'admin') {
    // Consulta SQL para selecionar todos os usuários da tabela 'usuarios' (substitua 'usuarios' pelo nome de sua tabela)
    const sql = 'SELECT * FROM usuarios';

    connection.query(sql, (err, users) => {
      if (err) {
        console.error('Erro ao recuperar os usuários:', err);
        res.redirect('/admin');
      } else {
        res.render('admin-panel', { users });
      }
    });
  } else {
    res.redirect('/login');
  }
});

// Rota para alterar a senha do usuário
app.post('/admin/change-password', (req, res) => {
  const { userId, newPassword } = req.body;

  // Implemente a lógica de alteração de senha aqui (atualize a senha no banco de dados)
  // Por simplicidade, estamos apenas exibindo as informações na saída
  console.log(`Alterar senha do usuário ID ${userId} para: ${newPassword}`);
  res.redirect('/admin');
});

// Rota para a página de login (implemente a autenticação real)
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
  
    const query = 'SELECT * FROM login WHERE usuario = ?';
    db.query(query, [usuario], async (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Database error' });
      } else if (results.length === 1) {
        const user = results[0];
        // Use bcrypt.compare para verificar a senha
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (isPasswordValid) {
          const payload = { id: user.id, usuario: user.usuario };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
          res.json({ success: true, token: token });
        } else {
          res.status(401).json({ success: false, message: 'Authentication failed' });
        }
      } else {
        res.status(401).json({ success: false, message: 'User not found' });
      }
    });
  });

app.listen(8090, () => {
  console.log('Servidor em execução na porta 3000');
});
