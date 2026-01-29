const notesRouter = require('express').Router()
const Blog = require('../models/blogPost.js')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user")
  response.json(blogs)
  
})

notesRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  const users = await User.find({})
  const user = users[0]

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
  
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