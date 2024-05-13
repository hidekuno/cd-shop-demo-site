/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { testRender, Response } from './common'

global.fetch = jest.fn(() => new Response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })

describe('unit test', () => {
  test('add to cart click 2unit test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    expect(screen.getByText('Total Amount: $50')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
  test('purchase click test', async () => {
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
    expect(screen.getByText('Would you like to buy?')).toBeInTheDocument()
  })
  test('dialog cancel click test', async () => {
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Buy' }))
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    })

    await waitFor(() => {
      expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    })
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
      fireEvent.keyDown(screen.getByRole('button', { name: 'Cancel' }), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27
      })
    })
    await waitFor(() => {
      expect(screen.queryByAltText('Would you like to buy?')).not.toBeInTheDocument()
    })
  })
  test('dialog use point change test', async () => {
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
      fireEvent.change(switchElement, { target: { checked: true } })
    })
    expect(screen.getByText('Your Point: $50')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $0')).toBeInTheDocument()
  })
  test('dialog use point change test (0 point)', async () => {
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
      fireEvent.change(switchElement, { target: { checked: true } })
    })
    expect(screen.getByText('Your Point: $0')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()
  })
  test('select test', async () => {
    await waitFor(() => { testRender() })
    const button = within(screen.getByTestId('select-element')).getByRole('button')
    fireEvent.mouseDown(button)
    const options = within(within(screen.getByRole('presentation')).getByRole('listbox')).getAllByRole('option')
    await waitFor(() => {
      fireEvent.click(options[1])
    })
    expect(button).toHaveTextContent('LP')
  })
})
