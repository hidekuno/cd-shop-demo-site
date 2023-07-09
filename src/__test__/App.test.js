import React from "react"
import { Provider } from "react-redux"

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'

import App from "../App"
import { configureStore } from "../store"

const store = configureStore({})

const response = class {
  constructor(filename) {
    this.filename = filename
  }
  json() {
    const fs = require("fs")
    return JSON.parse(fs.readFileSync(this.filename, 'utf8'))
  }
}
global.fetch = jest.fn(() => new response("public/cd.json"))

describe('unit test', () => {

  test("snapshot test ", async () => {
    let component
    await waitFor(() => {
      component = render(<Provider store={store}>
                         <React.StrictMode>
                         <App />
                         </React.StrictMode>
                         </Provider>)
    })
    expect(component.container).toMatchSnapshot()
  })

  test("initial test ", async () => {
    await waitFor(() => {
      render(<Provider store={store}>
             <React.StrictMode>
             <App />
             </React.StrictMode>
             </Provider>)
    })
    expect(screen.getAllByRole("button", { name: 'Add to Cart' })).toHaveLength(10)

    const data = fetch("public/cd.json").json()
    data.forEach(element => {
      expect(screen.getByText(element.title)).toBeInTheDocument()

      expect(screen.getAllByText(element.artist)).toHaveLength(
        data.filter((n) => (n.artist == element.artist)).length)
      expect(screen.getAllByText('$' + element.price)).toHaveLength(
        data.filter((n) => (n.price == element.price)).length)

      expect(screen.getByText(element.description)).toBeInTheDocument()
      expect(screen.getByAltText(element.title).src).toContain(element.imageUrl)
    })
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })

  test("add to cart click 1 test ", async () => {
    await waitFor(() => {
      render(<Provider store={store}>
             <React.StrictMode>
             <App />
             </React.StrictMode>
             </Provider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole("button", { name: 'Add to Cart' })[0])
    })
    expect(screen.getByText('In your cart')).toBeInTheDocument()
    expect(screen.getByText('Total Amount: $25')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole("button", { name: 'Add to Cart' })[1])
    })
    expect(screen.getByText('Total Amount: $48')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getAllByRole("button", { name: 'Add to Cart' })[2])
    })
    expect(screen.getByText('Total Amount: $69')).toBeInTheDocument()
  })

  test("delete click test ", async () => {
    await waitFor(() => {
      render(<Provider store={store}>
             <React.StrictMode>
             <App />
             </React.StrictMode>
             </Provider>)
    })
    await waitFor(() => {
     fireEvent.click(screen.getAllByRole("button", { name: 'Delete' })[2])
    })
    await waitFor(() => {
     fireEvent.click(screen.getAllByRole("button", { name: 'Delete' })[1])
    })
    expect(screen.getByText('Total Amount: $21')).toBeInTheDocument()
    await waitFor(() => {
     fireEvent.click(screen.getAllByRole("button", { name: 'Delete' })[0])
    })
    expect(screen.getByText('There are no items in your cart.')).toBeInTheDocument()
  })
  test("add to cart click 2unit test ", async () => {
    await waitFor(() => {
      render(<Provider store={store}>
             <React.StrictMode>
             <App />
             </React.StrictMode>
             </Provider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole("button", { name: 'Add to Cart' })[0])
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole("button", { name: 'Add to Cart' })[0])
    })
    expect(screen.getByText('Total Amount: $50')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
  test("purchase click test ", async () => {
    await waitFor(() => {
      render(<Provider store={store}>
             <React.StrictMode>
             <App />
             </React.StrictMode>
             </Provider>)
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: 'Purchase' }))
    })
    expect(screen.getByText('Your Point: $100')).toBeInTheDocument()
    expect(screen.getAllByText('Total Amount: $50')).toHaveLength(2)
    expect(screen.getByText('Would you like to buy?')).toBeInTheDocument()
  })
})
