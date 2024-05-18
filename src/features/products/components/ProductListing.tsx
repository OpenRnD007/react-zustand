import { Product, useStore } from "../../../store";
import ProductCard from "./ProductCard";

/**
* ProductListing component that displays a list of product cards.
* It retrieves the list of products from the store using the `useStore` hook.
*/
const ProductListing: React.FC = (): React.ReactElement => {
    // Retrieve the list of products from the store
    const products: Product[] = useStore((state) => state.products);

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 product-list">
            {products.map((productInfo) => (
                // Render a ProductCard for each product
                <ProductCard productInfo={productInfo} key={productInfo.id} />
            ))}
        </div>
    )
}
export default ProductListing