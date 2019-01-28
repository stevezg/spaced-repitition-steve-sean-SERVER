'use strict'

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mongodb://stevezg:a000000@ds115595.mlab.com:15595/spaced-repitition',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/thinkful-backend-test',

  JWT_SECRET: process.env.JWT_SECRET
}
