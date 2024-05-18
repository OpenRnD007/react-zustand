import './App.css'
import { withMainLayout } from './components'
import Cart from './features/cart'
import Products from './features/products'
import { useStore } from './store'

/**
* App component that conditionally renders the Cart or Products component.
* It uses the `useStore` hook from Zustand to manage global state across the app.
* The decision to render is based on the `showCart` state variable.
* 
* Note: The use of react-router-dom is omitted in this example to focus on Zustand usage.
* 
* @returns The App component wrapped with the MainLayout HOC.
*/
function App(): JSX.Element {
  // Accessing the showCart state from the global store
  const showCart = useStore((state) => state.showCart);

  return (
    <>
      {/* Conditionally rendering Cart or Products based on the showCart state */}
      {showCart ? <Cart /> : <Products />}
    </>
  )
}

export default withMainLayout(App)
