const bcrypt = require('bcrypt')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const assert = require('assert')


const api = supertest(app)
//npm test -- tests/userCreation.test.js

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation doesnt succeed with a short username', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
    username: 'ab',
    password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('shorter'))
  })

  test('creation doesnt succeed with duplicate username', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
    username: 'root',
    password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('creation doesnt succeed with a short password', async () => {
    let users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
    username: 'testi',
    password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    users = await User.find({})
    const usersAtEnd = users.map(u => u.toJSON())

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('password must be at least 3 characters long'))
  })
})

after(async () => {
  await mongoose.connection.close()
})