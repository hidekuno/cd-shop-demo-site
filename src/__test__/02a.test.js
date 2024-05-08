/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import {screen, waitFor, fireEvent,} from '@testing-library/react'
import '@testing-library/jest-dom'
import {testRender, response} from './common'

global.fetch = jest.fn(() => new response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })

describe('unit test', () => {
  test('dialog ok click test', async () => {
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
    await waitFor(() => {
      const switchElement = screen.getByLabelText('Use Points')
      fireEvent.click(switchElement)
      fireEvent.change(switchElement, { target: { checked: true }})
    })
    expect(screen.getByText('Your Point: $50')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $0')).toBeInTheDocument()
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, {target: {value: 'foo@hoge.com'}})
    const textAddress = screen.getByRole('textbox', { name: 'Address' })
    fireEvent.change(textAddress, {target: {value: 'Osaka,Japan'}})

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
  test('dialog escape key test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    await waitFor(() => {
      const switchElement = screen.getByLabelText('Use Points')
      fireEvent.click(switchElement)
      fireEvent.change(switchElement, { target: { checked: true }})
    })
    expect(screen.getByText('Your Point: $75')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $0')).toBeInTheDocument()
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, {target: {value: 'foo@hoge.com'}})
    const textAddress = screen.getByRole('textbox', { name: 'Address' })
    fireEvent.change(textAddress, {target: {value: 'Osaka,Japan'}})

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.getByText('Complete')).toBeInTheDocument()
    expect(screen.getByText('Thanks for your purchase.(This is a Demo Program.)')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.keyDown(screen.getByRole('button', { name: 'Close' }), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27
      })
    })
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test('dialog ok click test point less zero', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    await waitFor(() => {
      const switchElement = screen.getByLabelText('Use Points')
      fireEvent.click(switchElement)
      fireEvent.change(switchElement, { target: { checked: true }})
    })
    expect(screen.getByText('Your Point: $0')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, {target: {value: 'foo@hoge.com'}})
    const textAddress = screen.getByRole('textbox', { name: 'Address' })
    fireEvent.change(textAddress, {target: {value: 'Osaka,Japan'}})

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
})
