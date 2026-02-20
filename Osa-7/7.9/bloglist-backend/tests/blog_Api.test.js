//npm test -- tests/blog_api.test.js
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogPost.js')
const app = require('../app')
const assert = require('assert')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)

  const user = await new User({
    username: 'mluukkai',
    passwordHash,
  }).save()

  token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
  )
  await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs get returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.length)
})

test('blogs have id field instead of _id', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body) {
    assert(blog.id)
    assert.strictEqual(blog._id, undefined)
  }
})

test('blogs are added right', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.length + 1)
})

test('likes are automatically set to 0', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('returns bad request if title or url is missing', async () => {
  const newBlog = {
    author: 'Michael Chan',
    likes: 7,
  }
  const result = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(
    result.body.error.includes(
      'Blog validation failed: title: Path `title` is required., url: Path `url` is required.',
    ),
  )
})

test('viewing a specific note', async () => {
  const blog = await Blog.findOne({})

  const specificBlog = await api
    .get(`/api/blogs/${blog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.deepStrictEqual(specificBlog.body, blog.toJSON())
})

test('blogs are modified right', async () => {
  const blog = await Blog.findOne({})

  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 8,
  }
  await api
    .put(`/api/blogs/${blog.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(`/api/blogs/${blog.id}`)
  assert.strictEqual(response.body.likes, 8)
})

test('blogs are not added when no token', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(result.body.error, 'token missing or invalid')
  assert.strictEqual(response.body.length, blogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
