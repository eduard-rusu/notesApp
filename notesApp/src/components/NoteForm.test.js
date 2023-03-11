import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteFrom from './NoteForm'

describe('<NoteForm />', () => {
  test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteFrom handleOnAddNote={createNote}/>)
    
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('Add')

    await user.type(input, 'testing a form')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form')
  })
})