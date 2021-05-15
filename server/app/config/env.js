const env = {
  database: 'DocMag',
  username: 'root',
  password: 'Cuong0421',
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;