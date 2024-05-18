import { CartItem, useStore } from "../../../store";
import { convertIntoDecimals } from "../../../utils";

/**
* Type definition for the props of the CartCard component.
*/
type CartCardProps = {
    cartInfo: CartItem;
};

/**
* CartCard component that displays information about a single cart item.
* It shows the product image, name, description, and price, as well as the total price based on quantity.
* 
* @param {CartCardProps} props - The props containing cart information.
* @returns {React.ReactElement} The CartCard component.
*/
const CartCard: React.FC<CartCardProps> = ({ cartInfo }: CartCardProps): React.ReactElement => {
    return (
        <div data-cy="cart-listing" className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
            <div className="w-full md:max-w-[126px]">
                <img src={cartInfo.product.image} alt={cartInfo.product.name} className="mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{cartInfo.product.name}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{cartInfo.product.description}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                            ${convertIntoDecimals(cartInfo.product.price, 2)}
                        </h6>
                    </div>
                </div>
                <CartQuantity cartInfo={cartInfo} />
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        ${convertIntoDecimals(cartInfo.product.price * cartInfo.quantity, 2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartCard;

/**
* CartQuantity component that allows users to adjust the quantity of a cart item.
* It provides buttons to increase or decrease the quantity, and removes the item if the quantity reaches zero.
* 
* @param {CartCardProps} props - The props containing cart information.
* @returns {React.ReactElement} The CartQuantity component.
*/
const CartQuantity: React.FC<CartCardProps> = ({ cartInfo }: CartCardProps): React.ReactElement => {
    const addToCart = useStore((state) => state.addToCart);
    const removeFromCart = useStore((state) => state.removeFromCart);

    return (
        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
            <div className="flex items-center h-full">
                <button
                    data-cy="decrement-quantity"
                    className="group rounded-l-xl px-5 py-[17px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                    onClick={() => {
                        const currentQuantity = cartInfo.quantity - 1;
                        if (currentQuantity <= 0) {
                            removeFromCart(cartInfo.product.id);
                        } else {
                            addToCart(cartInfo.product, -1);
                        }
                    }}
                >
                    -
                </button>
                <div data-cy="cart-item-quantity" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent">
                    {cartInfo.quantity}
                </div>
                <button
                    data-cy="increment-quantity"
                    className="cursor-pointer group rounded-r-xl px-5 py-[17px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                    onClick={() => {
                        addToCart(cartInfo.product, 1);
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
};