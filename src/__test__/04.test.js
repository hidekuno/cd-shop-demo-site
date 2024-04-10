'use strict'

import React from 'react'
import '@testing-library/jest-dom'
import {screen, waitFor, fireEvent,} from '@testing-library/react'
import {testRender, testLoginRender, response,} from './common'

global.fetch = jest.fn(() => new response('public/cd-mini.json'))
AbortSignal.timeout = jest.fn().mockReturnValue({ timeout: 5000 })

describe('unit test etc', () => {
  test('sign out  test', async () => {

    const mockedUsedNavigate = jest.fn()

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate,
    }))
    await waitFor(() => { testRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('link')[0])
    })
  })

  test('sign in  test', async () => {
    await waitFor(() => { testLoginRender() })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('button')[0])
    })
  })
})
