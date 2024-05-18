import { useStore } from "../../../store"
import CartCard from "./CartCard"

/**
* CartListing component that renders a list of CartCard components.
* Each CartCard represents an item in the shopping cart.
* 
* @returns A list of CartCard components representing the items in the cart.
*/
const CartListing: React.FC = () => {
    // Retrieve the list of cart items from the store
    const cartList = useStore((state) => state.cart)

    return (
        <>
            {/* Map through the cartList and render a CartCard for each item */}
            {cartList.map((cartInfo) => (
                <CartCard cartInfo={cartInfo} key={cartInfo.product.id} />
            ))}
        </>
    );
};


export default CartListing