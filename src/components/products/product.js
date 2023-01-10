import './productsStyles/productStyle.css';
import {useState} from "react";
import {useCartActions} from "../../store/features/cartSlice/actionsIndex";

function Product({item}) {
    const {addToCart} = useCartActions();

    const {id, image, category, title, description, price} = item;
    const [readMore, setReadMore] = useState(false);

    const newImage = image.replace("***", process.env.REACT_APP_IMAGEKIT_KEY);

    return (
        <div className="product round container">

            <img src={newImage} alt="catalog-item" width="80%" height="auto" loading="lazy"/>
            <p>{category}</p>
            <h2>{title}</h2>

            <p>{readMore ? description : description.slice(0, 20)}
                <span className="read-more" onClick={() => setReadMore(!readMore)}>
                {readMore ? '  show less' : '  ...read more'}
            </span>
            </p>

            <button className="button"
                    onClick={() => addToCart({id, quantity: 1, price, itemsTotal: price})}>
                    {`Buy ${price} $`}
            </button>
        </div>
    );
}

export default Product;