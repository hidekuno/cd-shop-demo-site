'use strict'

import React from 'react'
import {screen, waitFor, fireEvent, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {testRender, response} from './common'

global.fetch = jest.fn(() => new response('public/cd-mini.json'))

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
  test('image click test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getByAltText('Revolver'))
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    })
    await waitFor(() => {
      fireEvent.click(screen.getByAltText('Revolver'))
    })
    await waitFor(() => {
      fireEvent.keyDown(screen.getByRole('button', { name: 'Close' }), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27
      })
    })
  })
})
