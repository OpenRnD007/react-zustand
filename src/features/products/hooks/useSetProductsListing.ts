import { useEffect } from "react"
import { dummyProducts } from "../../../store/dummy"
import { Product, useStore } from "../../../store"

/**
* Custom hook to set the product listing in the store.
* It fetches the products and populates the store on component mount.
*/
const useSetProductsListing = (): void => {
    const fetchProducts = useStore((state: { fetchProductsDummy: (products: Product[]) => void }) => state.fetchProductsDummy);

    useEffect(() => {
        // Populate the store with dummy products
        fetchProducts(dummyProducts);
    }, [fetchProducts]);
}

export default useSetProductsListing;