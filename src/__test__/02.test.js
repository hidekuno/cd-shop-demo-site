import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import {App} from '../App'
import { ShopContextProvider } from '../store'

const response = class {
  constructor(filename) {
    this.filename = filename
  }
  json() {
    const fs = require('fs')
    return JSON.parse(fs.readFileSync(this.filename, 'utf8'))
  }
}
global.fetch = jest.fn(() => new response('public/cd.json'))

describe('unit test', () => {
  test('dialog ok click test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Purchase' }))
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
  test('email required validate test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Purchase' }))
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
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Purchase' }))
    })
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, {target: {value: 'foo@hoge.'}})

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    expect(screen.queryByText('Constraints not satisfied')).toBeInTheDocument()
    expect(textMail).toBeInvalid()
  })
  test('address format validate test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Purchase' }))
    })
    const textMail = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(textMail, {target: {value: 'foo@hoge.com'}})

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    })
    expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    expect(screen.queryByText('Constraints not satisfied')).toBeInTheDocument()
    const textAddr = screen.getByRole('textbox', { name: 'Address' })
    expect(textAddr).toBeInvalid()
  })
})
