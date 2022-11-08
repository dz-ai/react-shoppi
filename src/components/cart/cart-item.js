import './cartStyles/cartItemStyle.css';
import {GrClose} from "react-icons/gr";
import { AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {removeFromCart, addToCart} from "../../store/features/cartSlice";

function CartItem({item, cartItem}) {
// item content all that related to this specific item (quantity and item'sTotal) and cartItem give all general info
    const dispatch = useDispatch();

    return (
        <div className="cart-item round container">
            {cartItem &&
                <div className="cart-item-content container">
                <img width="40" height="auto" src={cartItem.image} alt={cartItem.title}/>
                <p>{cartItem.title}</p>
                <button className="icon-button" onClick={() => dispatch(removeFromCart({id: cartItem.id, acTy: 'all'}))}><GrClose/></button>
            </div>
            }

            {cartItem &&
                <div className="container cart-summery">
                <div>
                    <button className="icon-button"
                            onClick={() => dispatch(removeFromCart({id: cartItem.id, acTy: '-'}))}
                            disabled={item.quantity <= 0}>
                        <AiOutlineMinus/>
                    </button>
                    <button className="icon-button"
                            onClick={() => dispatch(addToCart({id: cartItem.id}))}
                            disabled={item.quantity >= 10}>
                        <AiOutlinePlus/>
                    </button>
                </div>
                <p>{item.quantity} {item.quantity > 1 ? 'Items' : 'Item'}</p>
                <p>{item.itemsTotal.toFixed(2)} $</p>
            </div>
            }
                <hr/>
            </div>
    );
}

export default CartItem;