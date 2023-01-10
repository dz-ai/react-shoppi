import './productsStyles/productStyle.css';
import './productsStyles/masonryStyles.css';
import {useState} from "react";
import {useCartActions} from "../../store/features/cartSlice/actionsIndex";
import ImagePlaceHolder from "../imagePlaceHolder";

function Product({item}) {
    const {addToCart} = useCartActions();

    const {id, image, category, title, description, price} = item;
    const [readMore, setReadMore] = useState(false);


    return (
        <div className="product round container">

                <ImagePlaceHolder imageUrl={image} alt={title}/>

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