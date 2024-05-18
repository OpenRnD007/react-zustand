import { useStore } from "../../../store"

/**
* CartHeader component that displays the header section of the shopping cart.
* It shows the title 'Shopping Cart' and the total number of items in the cart.
* Additionally, it provides headings for product details, quantity, and total cost.
* 
* @returns {React.ReactElement} The CartHeader component.
*/
const CartHeader: React.FC = (): React.ReactElement => {
    // Retrieve the length of cart items from the store
    const cartLength = useStore((state) => state.cartSummary.cartlength);

    return (
        <>
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{cartLength} Items</h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                        <div className="col-span-3">
                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default CartHeader