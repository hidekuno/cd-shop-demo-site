'use strict'

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
  test('add to cart click 2unit test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    expect(screen.getByText('Total Amount: $50')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
  test('purchase click test', async () => {
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
    expect(screen.getByText('Your Point: $100')).toBeInTheDocument()
    expect(screen.getAllByText('Total Amount: $50')).toHaveLength(2)
    expect(screen.getByText('Would you like to buy?')).toBeInTheDocument()
  })
  test('dialog cancel click test', async () => {

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
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    })

    await waitFor(() => {
      expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    })
  })
  test('dialog use point change test', async () => {

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
  })
})
