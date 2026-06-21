import { test, expect } from '@playwright/test'
import * as todoActions from '../app-actions/todo-actions'

test.beforeEach(async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/')
})

test('Validate adding TODOs', async ({ page }) => {
  await todoActions.addToDo(
    page,
    'Withdraw 200 BRL',
    'Buy deodorant',
    'Buy underwear',
  )
  await expect(page.getByTestId('todo-item')).toContainText([
    'Withdraw 200 BRL',
    'Buy deodorant',
    'Buy underwear',
  ])
  await expect(page.getByTestId('todo-item')).toHaveCount(3)
})

test('Validate completing a TODO', async ({ page }) => {
  await todoActions.addToDo(
    page,
    'Withdraw 200 BRL',
    'Buy deodorant',
    'Buy underwear',
  )
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Buy underwear' })
    .getByTestId('todo-item-toggle')
    .check()

  await expect(
    page
      .getByRole('listitem')
      .filter({ hasText: 'Buy underwear' })
      .getByTestId('todo-item-toggle'),
  ).toBeChecked()

  await page.getByRole('link', { name: 'Completed' }).click()
  await expect(page.getByTestId('todo-item')).toHaveCount(1)
})

test('Validate removing a TODO', async ({ page }) => {
  await todoActions.addToDo(
    page,
    'Withdraw 200 BRL',
    'Buy deodorant',
    'Buy underwear',
  )
  await todoActions.removeToDo(page, 'Buy deodorant', 'Withdraw 200 BRL')
  await expect(page.getByTestId('todo-item')).toHaveCount(1)

  //Assertion option 1: check the entire list container
  await expect(page.getByTestId('todo-item')).not.toContainText([
    'Buy deodorant',
    'Withdraw 200 BRL',
  ])
  //Assertion option 2: check for that specific item's visibility
  await expect(
    page.getByTestId('todo-item').filter({ hasText: 'Buy deodorant' }),
  ).not.toBeVisible()

  await expect(
    page.getByTestId('todo-item').filter({ hasText: 'Withdraw 200 BRL' }),
  ).not.toBeVisible()
})
