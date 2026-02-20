const blogsRouter = require('express').Router()
const Blog = require('../models/blogPost.js')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user')

  response.status(201).json(populatedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  const result = await blog.save()

  const populatedBlog = await blog.populate('user')

  response.status(200).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    // 🔥 owner check (TÄRKEIN)
    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: 'only creator can delete blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  if (!comment) {
    return res.status(400).json({ error: 'Comment missing' })
  }

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    blog.comments.push(comment) // lisää uusi kommentti
    const savedBlog = await blog.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = blogsRouter
