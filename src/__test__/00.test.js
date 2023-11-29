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

  test('snapshot test', async () => {
    let component
    await waitFor(() => {
      component = render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    expect(component.container).toMatchSnapshot()
  })
  test('initial test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    expect(screen.getAllByRole('button', { name: 'Add to Cart' })).toHaveLength(10)
    expect(screen.getAllByText('Pink Floyd')).toHaveLength(2)
    expect(screen.getByText('Atom Heart Mother')).toBeInTheDocument()
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test('add to cart click 1 test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    expect(screen.getByText('In your cart')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[1])
    })
    expect(screen.getByText('Total Amount: $48')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[2])
    })
    expect(screen.getByText('Total Amount: $69')).toBeInTheDocument()
    expect(screen.getAllByText('Revolver')).toHaveLength(2)
    expect(screen.getAllByText('The Beatles')).toHaveLength(3)
  })
  test('delete click test', async () => {
    await waitFor(() => {
      render(<ShopContextProvider><App /></ShopContextProvider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[1])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[2])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[2])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1])
    })
    expect(screen.getByText('Total Amount: $21')).toBeInTheDocument()
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    })
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test('delete click test multi', async () => {
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
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    })
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()
  })
})
