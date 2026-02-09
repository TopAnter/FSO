import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "testaaja pro"
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(/Component testing is done with react-testing-library/)
  expect(element).toBeDefined()
})

test('renders all info when shown all details', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "testaaja pro",
    url: "https://react-testing-library.com/",
    user: {
      name: "testaaja pro"
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText(/Component testing is done with react-testing-library/)
  expect(element).toBeDefined()
})

test('2 calls when pressing like button 2 times', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "testaaja pro",
    url: "https://react-testing-library.com/",
    user: {
      name: "testaaja pro"
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()


  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('createBlog calls with right info', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "testaaja pro",
    url: "https://react-testing-library.com/",
    user: {
      name: "testaaja pro"
    }
  }

  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<CreateBlog createBlog={createBlog} />)

  const inputTitle = screen.getByLabelText('title')
  const inputAuthor = screen.getByLabelText('author')
  const inputUrl = screen.getByLabelText('url')

  const sendButton = screen.getByText('create')

  await user.type(inputTitle, blog.title)
  await user.type(inputAuthor, blog.author)
  await user.type(inputUrl, blog.url)

  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
})