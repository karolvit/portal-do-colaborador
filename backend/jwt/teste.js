const bcrypt = require('bcrypt');

const version = parseInt(require('bcrypt/package.json').version)
console.log('Versão bcrypt: ', version)

const crypto = require('crypto');
const saltValue = crypto.randomBytes(12).toString('hex')
console.log(saltValue)

