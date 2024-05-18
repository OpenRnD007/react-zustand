import CartHeader from "./components/CartHeader"
import CartListing from "./components/CartListing"
import CartSummary from "./components/CartSummary"

/**
* Cart component that renders the shopping cart page.
* It consists of three main sub-components:
* - CartHeader: Displays the header of the cart.
* - CartListing: Lists the items in the cart.
* - CartSummary: Shows the summary of the cart including total price.
* 
* The layout is structured using CSS grid to provide a responsive design.
* 
* @returns The Cart component with header, listing, and summary sections.
*/
const Cart: React.FC = () => {

    return (
        <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        {/* Header of the cart */}
                        <CartHeader />
                        {/* Listing of cart items */}
                        <CartListing />
                    </div>
                    {/* Summary of the cart */}
                    <CartSummary />
                </div>
            </div>
        </section>
    );
};

export default Cart;