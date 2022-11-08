import './productsStyles/productsStyle.css';
import Product from "./product";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/features/productsSlice";

function Products() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className="container products-wrapper">
            <div className="products container">
                {products.loading === true
                    ?
                    <h2>loading...</h2>
                    :
                    products.filteredProducts.map(item =>
                        <Product key={item.id}
                            item={item}/>)
                }
            </div>
        </div>
    );
}

export default Products;