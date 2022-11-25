import './productsStyles/productStyle.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../store/features/slices/cartSlice";

function Product({item}) {
    const dispatch = useDispatch();

    const {id, image, category, title, description, price} = item;
    const [readMore, setReadMore] = useState(false);

    return (
        <div className="product round container">
            <img src={image} alt="catalog-item" width="80%" height="auto"/>
            <p>{category}</p>
            <h2>{title}</h2>

            <p>{readMore ? description : description.slice(0, 20)}
                <span className="read-more" onClick={() => setReadMore(!readMore)}>
                {readMore ? '  show less' : '  ...read more'}
            </span>
            </p>

            <button className="button"
                    onClick={() => dispatch(addToCart({id, quantity: 1, price, itemsTotal: price}))}>
                    {`Buy ${price} $`}
            </button>
        </div>
    );
}

export default Product;