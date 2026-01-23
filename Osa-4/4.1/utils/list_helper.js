const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0]
  }
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
}

module.exports = {
  totalLikes,
  favoriteBlog
}