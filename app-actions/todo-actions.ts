import { Page } from '@playwright/test'

async function addToDo(page: Page, ...todos: string[]) {
  for (const todo of todos) {
    await page.getByTestId('text-input').fill(todo)
    await page.getByTestId('text-input').press('Enter')
  }
}

async function removeToDo(page: Page, ...todos: string[]) {
  for (const todo of todos) {
    await page.getByTestId('todo-item-label').filter({ hasText: todo }).hover()
    await page.getByRole('button', { name: '×' }).click()
  }
}

export { addToDo, removeToDo }
