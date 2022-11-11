import './cartStyles/cartStyle.css';
import CartItem from "./cart-item";
import {GrClose} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {
    clearSavedCart,
    fetchSavedCart,
    getSavedCart,
    saveCart,
    showCart
} from "../../store/features/cartSlice";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SavedCartMenu from "./savedCartMenu";

function Cart({cartItems, total}) {
    const products = useSelector(state => state.products.products);
    const isUserLog = useSelector(state => state.user.isLog);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSavedCarts, setShowSavedCarts] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handelSaveCart = () => {
        if (isUserLog) {
            dispatch(saveCart({cart: cart.cart}));
            dispatch(fetchSavedCart());
        } else {
            setMessage('please login first');
            setShowMessage(true);
        }
    };

    const handleSavedCartClick = (cartId) => {
        if (cart.cart.length === 0) {
            dispatch(clearSavedCart(cartId));
            dispatch(getSavedCart(cartId));
            setShowSavedCarts(false);
        } else {
            setMessage('please save current cart before fetch saved cart');
            setShowMessage(true);
        }
    };

    const handleClearSavedCart = (cartId) => {
        dispatch(clearSavedCart(cartId));
    };

    const handelSubmit = () => {
        if (isUserLog) {
            navigate('/submit')
            dispatch(showCart());
        } else {
            navigate('/login', {state: {name: 'Sign-in', id: '1'}});
            dispatch(showCart());
        }
    };

    return (
        <div className="container cart-wrapper">

            <header className="cart-header container">
                <h3>Cart</h3>
                <div className="container cart-header-buttons-wrapper">

                    <button className="cart-header-buttons button"
                            onClick={handelSaveCart}
                            disabled={showSavedCarts}>
                        save cart
                    </button>

                    <button className="cart-header-buttons button"
                            onClick={() => setShowSavedCarts(!showSavedCarts)}>
                        {showSavedCarts ? 'current cart' : 'saved cart'}
                    </button>
                </div>
                <button className="icon-button" onClick={() => dispatch(showCart())}>
                    <GrClose/>
                </button>
            </header>

            {!showSavedCarts &&
                <div className="cart-list">
                    {
                      cartItems.map(item =>
                        <CartItem
                            key={item.id}
                            item={item}
                            cartItem={products.find(product => product.id === item.id)}/>)
                    }
            </div>}

            {showSavedCarts && <div className="cart-list">
                <SavedCartMenu
                    savedCarts={cart.savedCarts}
                    handleSavedCartClick={handleSavedCartClick}
                    handleClearSavedCart={handleClearSavedCart}
                />
            </div>}

            <footer className="total container">
                Total: {total.toFixed(2)} $
                <button className="button"
                        onClick={handelSubmit}
                        disabled={cart.cart.length === 0}>
                    Submit Order
                </button>
            </footer>

            {showMessage &&
                <div className="container container-window cart-message">
                <h4>{message}</h4>
                <button onClick={() => setShowMessage(false)}>OK</button>
            </div>}
        </div>
    );
}

export default Cart;