import './productsStyles/productsStyle.css';
import Product from "./product";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryFilter, fetchProducts} from "../../store/features/slices/productsSlice";

function Products() {
    const dispatch = useDispatch();
    const productsState = useSelector(state => state.products);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(categoryFilter(products.category || '-select-'));
    }, []);

    useEffect(() => {
        if (productsState.filteredProducts.length > 0) {
            setProducts(productsState.filteredProducts);
        } else {
            setProducts(productsState.products);
        }
    }, [productsState]);

    return (
        <div className="container products-wrapper">
            <div className="products container">
                {productsState.loading === true
                    ?
                    <h2>loading...</h2>
                    :
                    products.map(item =>
                        <Product key={item.id}
                                 item={item}/>)
                }
            </div>
        </div>
    );
}

export default Products;