'use strict'

import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import {App} from '../App'
import { ShopContextProvider, CartContextProvider } from '../store'

const response = class {
  constructor(filename) {
    this.filename = filename
  }
  json() {
    const fs = require('fs')
    return JSON.parse(fs.readFileSync(this.filename, 'utf8'))
  }
}
global.fetch = jest.fn(() => new response('public/cd-mini.json'))

const testRender = () => {
  return render(
    <ShopContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ShopContextProvider>
  )
}
describe('unit test', () => {
  let component

  test('snapshot test', async () => {
    await waitFor(() => {
      component = testRender()
    })
    expect(component.container).toMatchSnapshot()
  })
  test('initial test', async () => {
    await waitFor(() => { testRender() })
    expect(screen.getAllByRole('button', { name: 'Cart' })).toHaveLength(10)
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test('add to cart click 1 test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    expect(screen.getByText('In your cart')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[1])
    })
    expect(screen.getByText('Total Amount: $48')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[2])
    })
    expect(screen.getByText('Total Amount: $69')).toBeInTheDocument()
    expect(screen.getAllByText('Revolver')).toHaveLength(1)
  })
  test('delete click test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[1])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[2])
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
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    })
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()
  })
})
