import { toast } from "react-toastify";
import { useStore } from "../../../store"

/**
* CartSummary component that displays the summary of the items in the cart.
* It shows the subtotal, delivery charges, and total amount, and provides options
* to proceed to checkout or continue shopping.
* 
* @returns The CartSummary component with order details and action buttons.
*/
const CartSummary: React.FC = () => {
    // Retrieve cart summary details from the store
    const cartSummary = useStore((state) => state.cartSummary);
    // Retrieve the setShowCart action from the store
    const setShowCart = useStore((state) => state.setShowCart);
    const checkout = useStore((state) => state.checkout);

    return (
        <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
            </h2>
            <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                    <p className="font-normal text-lg leading-8 text-black">Subtotal</p>
                    <p className="font-medium text-lg leading-8 text-black">${cartSummary.subtotal}</p>
                </div>
                <div className="flex items-center justify-between pb-6">
                    <p className="font-normal text-lg leading-8 text-black">Delivery</p>
                    <p className="font-medium text-lg leading-8 text-black">${cartSummary.delivery}</p>
                </div>

                <div className="flex items-center justify-between py-8">
                    <p data-cy="cart-summary" className="font-medium text-xl leading-8 text-black">Total</p>
                    <p data-cy="cart-total" className="font-semibold text-xl leading-8 text-indigo-600">${cartSummary.total}</p>
                </div>
                <button
                    data-cy="checkout-button"
                    className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                    onClick={() => {
                        checkout()
                        toast.success(`Order Placed successfully!`, {
                            position: 'top-center'
                        })
                    }}
                >
                    Checkout
                </button>
                <button
                    data-cy="continue-shopping-button"
                    className="mt-2 w-full text-center bg-yellow-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-yellow-700"
                    onClick={() => setShowCart(false)}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default CartSummary