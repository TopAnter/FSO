//npm test -- --project chromium
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'väärä')

      await expect(page.getByText("wrong username or password")).toBeVisible()
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
          await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
          await createBlog(page, 'React patterns', 'Michael Chan', 'https://reactpatterns.com/')
          await expect(page.getByText('React patterns Michael Chan')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
          await createBlog(page, 'React patterns', 'Michael Chan', 'https://reactpatterns.com/')
          await page.getByRole('button', { name: 'view', exact: true }).click()
          await page.getByRole('button', { name: 'Like', exact: true }).click()
          await expect(page.getByText('1 likes')).toBeVisible()
        })

        test('a blog can be removed', async ({ page }) => {
          await createBlog(page, 'React patterns', 'Michael Chan', 'https://reactpatterns.com/')
          await page.getByRole('button', { name: 'view', exact: true }).click()
          page.once('dialog', dialog => dialog.accept())

          await page.getByRole('button', { name: 'remove', exact: true }).click()
          await expect(page.getByText('React patterns Michael Chan')).not.toBeVisible()
        })

        test('a blog can only be removed by its creator', async ({ page , request}) => {
          await createBlog(page, 'React patterns', 'Michael Chan', 'https://reactpatterns.com/')

          await page.getByRole('button', { name: 'logout', exact: true }).click()

          await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Matti Luukkainen2',
              username: 'mluukkai2',
              password: 'salainen2'
            }
          })

          await loginWith(page, 'mluukkai2', 'salainen2')

          await page.getByRole('button', { name: 'view', exact: true }).click()

          await expect(page.getByRole('button', { name: 'remove', exact: true })).not.toBeVisible()
        
        })

        test.only('blogs are rendered in order of likes', async ({ page }) => {
          //tee blogit
          await createBlog(page, 'Blog A', 'A', 'url')
          await createBlog(page, 'Blog B', 'B', 'url')
          await createBlog(page, 'Blog C', 'C', 'url')

          //löydä eri view napit
          const viewButtons = page.getByRole('button', { name: 'view' })

          //painan aina ensimmäistä view nappia(toisen avautuessa se myös katoaa)
          await viewButtons.first().click()
          await viewButtons.first().click()
          await viewButtons.first().click()

          //löydä eri like napit
          const likeButtons = page.getByRole('button', { name: 'Like' })

          // anna eri määrät likeja(nämä napit eivät katoa)
          await likeButtons.nth(0).click()

          await likeButtons.nth(1).click()
          await likeButtons.nth(1).click()
          await likeButtons.nth(1).click()

          await likeButtons.nth(2).click()
          await likeButtons.nth(2).click()

          //odotus että ui päivittyy
          await page.waitForTimeout(500)

          //hanki blog itemit testID:n avulla
          const blogs = page.getByTestId('blog-item')

          await expect(blogs.nth(0)).toContainText('Blog B')
          await expect(blogs.nth(1)).toContainText('Blog C') 
          await expect(blogs.nth(2)).toContainText('Blog A') 
        })
})
  })
})