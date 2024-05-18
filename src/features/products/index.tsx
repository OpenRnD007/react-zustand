import { ProductListing } from './components';
import useSetProductsListing from './hooks/useSetProductsListing';

/**
* Products component responsible for rendering the product listing.
*/
const Products: React.FC = (): React.ReactElement => {
    // Set product listing, make API call, store products listing
    useSetProductsListing();

    return (
        <>
            <div className="pt-16  bg-white">
                <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
            </div>
            <section className="py-10 bg-gray-100">
                <ProductListing />
            </section>
        </>
    );
};

export default Products;