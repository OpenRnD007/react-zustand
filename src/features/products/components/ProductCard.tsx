import { Button, Rating } from "../../../components"
import { Product, useStore } from "../../../store";
import { convertIntoDecimals } from "../../../utils";
import { toast } from "react-toastify";

/**
* Type definition for the props of the ProductCard component.
*/
type ProductCardProps = {
    productInfo: Product;
};

/**
* ProductCard component that displays information about a single product.
* It includes an image, name, description, rating, and an 'Add to cart' button.
*
* @param {ProductCardProps} props - The props containing product information.
* @returns {React.ReactElement} The ProductCard component.
*/
const ProductCard: React.FC<ProductCardProps> = ({ productInfo }: ProductCardProps): React.ReactElement => {
    const addToCart = useStore((state) => state.addToCart)

    return (
        <article data-cy="product-card" className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 product-card">
            <div className="relative flex items-end overflow-hidden rounded-xl">
                <img src={productInfo.image} alt={productInfo.name} />
                {productInfo.rating && <Rating rate={productInfo.rating} />}
            </div>

            <div className="mt-1 p-2">
                <h2 className="text-slate-700">{productInfo.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{productInfo.description}</p>

                <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">${convertIntoDecimals(productInfo.price, 2)}</p>
                    <Button data_cy="add-to-cart" label='Add to cart' onclick={() => {
                        addToCart(productInfo, 1)
                        toast.success(`${productInfo.name} added to cart successfully!`, {
                            position: 'bottom-right'
                        })
                    }} />
                </div>
            </div>
        </article>
    );
};

export default ProductCard