const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return blogs[0].likes
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0]
  }
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
}

const mostBlogs = (blogs) => {
  const amountOfBlogs = {}

  for (const blog of blogs) {
    amountOfBlogs[blog.author] = (amountOfBlogs[blog.author] || 0) + 1
  }

  let topAuthor = null
  let maxCount = 0

  for (const [author, count] of Object.entries(amountOfBlogs)) {
    if (count > maxCount) {
      maxCount = count
      topAuthor = author
    }
  }

  return { author: topAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  const amountOfLikes = {}

  for (const blog of blogs) {
    amountOfLikes[blog.author] = (amountOfLikes[blog.author] || 0) + blog.likes
  }

  let topAuthor = null
  let maxCount = 0

  for (const [author, count] of Object.entries(amountOfLikes)) {
    if (count > maxCount) {
      maxCount = count
      topAuthor = author
    }
  }

  return { author: topAuthor, likes: maxCount }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
