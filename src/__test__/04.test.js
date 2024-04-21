/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import '@testing-library/jest-dom'
import {screen, waitFor, fireEvent,} from '@testing-library/react'
import {testRender, testLoginRender, response,} from './common'

global.fetch = jest.fn(() => new response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })
jest.spyOn(console, 'log').mockImplementation(x => x)

describe('unit test link', () => {
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
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('link')[1])
    })
    expect(screen.getByText(/Sign in to CD Shop/)).toBeInTheDocument()
  })
  test('tab', async () => {
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

    await waitFor(() => {
      fireEvent.click(screen.getByRole('tab', { name: 'Order', selected: false }))
    })
    expect(screen.getByText(/Order History/)).toBeInTheDocument()

    await waitFor(() => {
       fireEvent.click(screen.getByRole('tab', { name: 'Cart', selected: false }))
    })
    expect(screen.getByText(/There are no items in your cart./)).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('link')[0])
    })
  })
})
