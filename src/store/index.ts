import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { persist } from 'zustand/middleware';

// Define the types for our store's state
export type Product = {
    id: string;
    name: string;
    description?: string,
    price: number;
    image: string;
    rating?: number;
};

export type CartItem = {
    product: Product;
    quantity: number;
};
export type CartSummary = {
    subtotal: number,
    delivery: number,
    total: number,
    cartlength: number
};

interface StoreState {
    products: Product[];
    cart: CartItem[];
    cartSummary: CartSummary;
    showCart: boolean;
    fetchProductsDummy: (data: Product[]) => void;
    fetchProducts: (abortController: AbortController) => Promise<void>;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    setShowCart: (show: boolean) => void;
    checkout: () => void;
};

// Create the store with Zustand
export const useStore = create<StoreState>()(persist((set) => ({
    // Initial state
    products: [],
    cart: [],
    cartSummary: {
        subtotal: 0,
        delivery: 0,
        total: 0,
        cartlength: 0
    },
    showCart: false,
    // Fetches products from the server and updates the state
    fetchProducts: async (abortController: AbortController) => {
        try {
            const response = await axios.get('/api/products', {
                signal: abortController.signal // Pass the abort signal to axios
            });
            set({ products: response.data });
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axios.isCancel(axiosError)) {
                // Handle the cancellation of the request
                console.log('Fetch products request canceled:', axiosError.message);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up the request:', error);
            }
        }
    },

    // Fetches products from the server and updates the state
    fetchProductsDummy: (data: Product[]) => {
        set({ products: data })
    },

    // Adds a product to the cart or updates the quantity if it's already there
    addToCart: (product, quantity) => set((state) => {

        const cartItemIndex = state.cart.findIndex((item) => item.product.id === product.id);

        if (cartItemIndex !== -1) {
            // Update the quantity of the existing cart item
            const cart = [...state.cart]
            cart[cartItemIndex].quantity = cart[cartItemIndex].quantity + quantity
            const cartSummary = calculatecartSummary(cart)
            return { cart, cartSummary };
        } else {
            // Add the new product to the cart
            const cart = [...state.cart, { product, quantity }]
            const cartSummary = calculatecartSummary(cart)
            return { cart, cartSummary };
        }
    }),

    // Removes a product from the cart by its ID
    removeFromCart: (productId) => set((state) => {
        const cart = state.cart.filter((item) => item.product.id !== productId)
        const cartSummary = calculatecartSummary(cart)
        return {
            cart,
            cartSummary
        }
    }),

    setShowCart: (showCart) => {
        set({ showCart })
    },

    checkout: () => {
        set({
            cart: [],
            cartSummary: {
                subtotal: 0,
                delivery: 0,
                total: 0,
                cartlength: 0
            },
            showCart: false
        })
    }

}), {
    name: 'kicks-storage'
}));

/**
* Calculates the summary of the cart, including subtotal, delivery charge, and total amount.
* @param {CartItem[]} cart - The array of cart items.
* @returns An object containing the subtotal, delivery charge, and total amount.
*/
const calculatecartSummary = (cart: CartItem[]): CartSummary => {
    // Initialize subtotal to 0
    let subtotal = 0;
    // Set delivery charge, assumed to be 0 for this example
    const delivery = 0;

    // Calculate the subtotal by iterating over each cart item
    cart.forEach((item) => {
        subtotal += item.product.price * item.quantity;
    });

    // Return an object with the calculated subtotal, delivery charge, and total amount
    return {
        subtotal,
        delivery,
        total: subtotal + delivery,
        cartlength: cart.length
    };
};