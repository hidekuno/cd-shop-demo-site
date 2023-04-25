import "./App.css"
import { Shop } from "./components/Shop"
import { Cart } from "./components/Cart"

export const App = () => {
    return (
        <div>
            <header className="header">CD Shop <i><b>Demo</b></i> Site</header>
            <div className="container">
                <Shop />
                <Cart />
            </div>
        </div>
    )
}

export default App
