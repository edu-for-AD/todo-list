import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from '../components/containers/Todo'

describe('Todo', () => {
  it('should be the same result as click confirm button if the user press enter while editing', async () => {
    const user = userEvent.setup()

    render(<Todo />)

    const addButton = screen.getByRole('button', { name: 'add' })
    const textBox = screen.getByRole('textbox')

    await user.type(textBox, 'hello 111')
    await user.click(addButton)
    await user.type(textBox, 'hello 222')
    await user.click(addButton)

    const editButtons = screen.getAllByText('edit')

    // click first edit
    await user.click(editButtons[0])

    const editingTextBox = screen.getByDisplayValue('hello 111')

    await user.click(editingTextBox)
    await user.type(editingTextBox, '456')
    await user.type(editingTextBox, '{enter}')

    expect(screen.getByText('hello 111456')).toBeInTheDocument()
    expect(screen.queryByText('hello 111')).not.toBeInTheDocument()

    const newEditButtons = screen.getAllByText('edit')

    // click first edit
    await user.click(newEditButtons[0])

    // then hello 333 should be in the editing input box
    expect(screen.getByDisplayValue('hello 111456')).toBeInTheDocument()
  })

  it('should be the same result as click cancel button if the user press esc while editing', async () => {
    const user = userEvent.setup()

    render(<Todo />)

    const addButton = screen.getByRole('button', { name: 'add' })
    const textBox = screen.getByRole('textbox')

    await user.type(textBox, 'hello 111')
    await user.click(addButton)
    await user.type(textBox, 'hello 222')
    await user.click(addButton)

    const editButtons = screen.getAllByText('edit')

    // click first edit
    await user.click(editButtons[0])

    const editingTextBox = screen.getByDisplayValue('hello 111')

    await user.click(editingTextBox)
    await user.type(editingTextBox, '456')
    await user.type(editingTextBox, '{escape}')

    // then hello 333 should be ignored and hello 111 should be displayed
    expect(screen.queryByText('hello 111456')).not.toBeInTheDocument()
    expect(screen.getByText('hello 111')).toBeInTheDocument()


    const newEditButtons = screen.getAllByText('edit')

    // click first edit
    await user.click(newEditButtons[0])

    // then hello 111 should be in the editing input box
    expect(screen.getByDisplayValue('hello 111')).toBeInTheDocument()
  })

  it('should add line-through style if todo item is inactive', async () => {
    const user = userEvent.setup()

    render(<Todo />)

    const addButton = screen.getByRole('button', { name: 'add' })
    const textBox = screen.getByRole('textbox')

    await user.type(textBox, 'hello 111')
    await user.click(addButton)

    const checkbox = screen.getByRole('checkbox')

    expect(screen.getByText('hello 111')).not.toHaveStyle(
      'text-decoration: line-through'
    )

    await user.click(checkbox)

    expect(screen.getByText('hello 111')).toHaveStyle(
      'text-decoration: line-through'
    )
  })

  it('should filter by selected radio filter', async () => {
    const user = userEvent.setup()

    render(<Todo />)

    const addButton = screen.getByRole('button', { name: 'add' })
    const textBox = screen.getByRole('textbox')

    await user.type(textBox, 'hello 111')
    await user.click(addButton)
    await user.type(textBox, 'hello 222')
    await user.click(addButton)
    await user.type(textBox, 'hello 333')
    await user.click(addButton)
    await user.type(textBox, 'hello 444')
    await user.click(addButton)

    const archiveButtons = screen.getAllByRole('button', { name: 'archive' })
    const checkboxes = screen.getAllByRole('checkbox')

    await user.click(archiveButtons[0])
    await user.click(archiveButtons[1])
    await user.click(archiveButtons[3])
    await user.click(checkboxes[2])
    await user.click(checkboxes[3])

    expect(screen.getByText('hello 111')).toBeInTheDocument()
    expect(screen.getByText('hello 222')).toBeInTheDocument()
    expect(screen.getByText('hello 333')).toBeInTheDocument()
    expect(screen.getByText('hello 444')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'archived' }))
    await user.click(screen.getByRole('radio', { name: 'activated' }))

    expect(screen.getByText('hello 111')).toBeInTheDocument()
    expect(screen.getByText('hello 222')).toBeInTheDocument()
    expect(screen.queryByText('hello 333')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 444')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'unarchived' }))
    await user.click(screen.getByRole('radio', { name: 'activated' }))

    expect(screen.queryByText('hello 111')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 222')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 333')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 444')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'archived' }))
    await user.click(screen.getByRole('radio', { name: 'inactivated' }))

    expect(screen.queryByText('hello 111')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 222')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 333')).not.toBeInTheDocument()
    expect(screen.getByText('hello 444')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'unarchived' }))
    await user.click(screen.getByRole('radio', { name: 'inactivated' }))

    expect(screen.queryByText('hello 111')).not.toBeInTheDocument()
    expect(screen.queryByText('hello 222')).not.toBeInTheDocument()
    expect(screen.getByText('hello 333')).toBeInTheDocument()
    expect(screen.queryByText('hello 444')).not.toBeInTheDocument()
  })
})
