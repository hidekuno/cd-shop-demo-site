import React from "react"
import { Provider } from "react-redux"

import { render, screen, waitFor, cleanup } from "@testing-library/react";
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

afterEach(cleanup)
describe('unit test', () => {
  let component

  test("snapshot test ", async () => {
    await waitFor(() => {
      component = render(<Provider store={store}>
                         <React.StrictMode>
                         <App />
                         </React.StrictMode>
                         </Provider>)
    })
    expect(component.container).toMatchSnapshot()
  })
})
