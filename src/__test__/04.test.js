'use strict'

import '@testing-library/jest-dom'
import {screen, waitFor, fireEvent,} from '@testing-library/react'
import {testRender, testLoginRender, response,} from './common'

global.fetch = jest.fn(() => new response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })
jest.spyOn(console, 'log').mockImplementation(x => x)

global.window ??= Object.create(window)
describe('unit test sign', () => {
  test('sign in/out test', async () => {
    await waitFor(() => { testLoginRender() })

    const textUser = screen.getByRole('textbox', { name: 'Username' })
    fireEvent.change(textUser, {target: {value: 'testtaro'}})

    // It's not work screen.getByRole('textbox', { name: 'Password' })
    const textPassword =  screen.getByLabelText(/Password/)
    fireEvent.change(textPassword, {target: {value: 'hogehoge'}})

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })
    expect(screen.getByText('testtaro')).toBeInTheDocument()
    expect(screen.getByText(/Sign out/)).toBeInTheDocument()

    Object.defineProperty(window, 'location', {
      value: {
        href: '/index.html',
        pathname: '/',
        search: '',
        hostname: '',
      },
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('link')[0])
    })
    expect(window.location.href).toEqual('/index.html');
  })
})
