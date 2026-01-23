const notesRouter = require('express').Router()
const Blog = require('../models/blogPost.js')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

notesRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  
  response.status(201).json(result)
  
})

notesRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

notesRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = await Blog.findById(request.params.id)


  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  const result = await blog.save()
  
  
  response.status(200).json(result)
  
})

module.exports = notesRouter