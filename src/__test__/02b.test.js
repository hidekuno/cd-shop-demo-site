/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import { screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { testRender, Response } from './common'

global.fetch = jest.fn(() => new Response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })

describe('unit test', () => {
  test('dialog ok click test(no point)', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    expect(screen.getByText('Your Point: $100')).toBeInTheDocument()
    expect(screen.getAllByText('Total Amount: $50')).toHaveLength(2)
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, { target: { value: 'foo@hoge.com' } })
    const textAddress = screen.getByRole('textbox', { name: 'Address' })
    fireEvent.change(textAddress, { target: { value: 'Osaka,Japan' } })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.getByText('Complete')).toBeInTheDocument()
    expect(screen.getByText('Thanks for your purchase.(This is a Demo Program.)')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    })
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test('email required validate test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    expect(screen.queryByText('Constraints not satisfied')).toBeInTheDocument()
    expect(textMail).toBeInvalid()
  })
  test('email format validate test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, { target: { value: 'foo@hoge.' } })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    expect(screen.queryByText('Constraints not satisfied')).toBeInTheDocument()
    expect(textMail).toBeInvalid()
  })
  test('address format validate test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, { target: { value: 'foo@hoge.com' } })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    expect(screen.queryByText('Constraints not satisfied')).toBeInTheDocument()
    const textAddr = screen.getByRole('textbox', { name: 'Address' })
    expect(textAddr).toBeInvalid()
  })
})
