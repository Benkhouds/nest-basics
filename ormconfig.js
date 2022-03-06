module.exports = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin123',
  database: 'coffees',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
