import { Page } from '@playwright/test'

/**
 * Adds one or more todo items to the application by filling the text input and submitting each todo.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param todos - A list of todo item strings to be added.
 * @returns A Promise that resolves when all todos have been added.
 */
async function addToDo(page: Page, ...todos: string[]) {
  for (const todo of todos) {
    await page.getByTestId('text-input').fill(todo)
    await page.getByTestId('text-input').press('Enter')
  }
}

/**
 * Removes one or more to-do items from the list by their labels.
 *
 * This function hovers over each specified to-do item to reveal the remove button,
 * then clicks the button to delete the item from the list.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param todos - The labels of the to-do items to remove.
 */
async function removeToDo(page: Page, ...todos: string[]) {
  for (const todo of todos) {
    await page.getByTestId('todo-item-label').filter({ hasText: todo }).hover()
    await page.getByRole('button', { name: '×' }).click()
  }
}

export { addToDo, removeToDo }
