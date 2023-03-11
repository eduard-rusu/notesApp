import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Note from './Note'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const note = {
    content: 'Component testing',
    important: true
  }

  const { container } = render(<Note note = {note}/>)

  const div = container.querySelector('.note')

  expect(div).toHaveTextContent('Component testing')
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing',
    important: true
  }

  const monckHandler = jest.fn()

  render(<Note note={note} handleOnModifyNote={monckHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Make Unimportant')
  await user.click(button)

  expect(monckHandler.mock.calls).toHaveLength(1)
})