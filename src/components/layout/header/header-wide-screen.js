import {MdOutlineShoppingCart} from "react-icons/md";
import {BiUser} from "react-icons/bi";
import UserMenu from "../../login-sign-in/user-menu";
import Cart from "../../cart/cart";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useProductsActions} from "../../../store/features/productsSlice/actionsIndex";
import Dropdown from "./dropdown";

function HeaderWideScreen({handelCartButton, handelUserButton, showUser, setShowUser}) {
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const username = useSelector(state => state.user.username);
    const isUserLog = (state => state.user.isLog);

    const navigate = useNavigate();
    const {categoryFilter} = useProductsActions();

    const options = ["Select Category", "electronics", "jewelery", "men's clothing", "women's clothing"]
    const [categoryValue, setCategoryValue] = useState(options[0]);

    useEffect(() => {
        categoryFilter(products.category);
    }, [products.category]);

    useEffect(() => {
        categoryFilter(categoryValue);
    }, [categoryValue]);

    return (
        <>
            <div className="header-content-wrapper container">
                <nav onClick={() => navigate('/')} className="button navButton">Home</nav>
                <div style={{width: "200px", marginLeft: "5px"}}>
                    <Dropdown
                        options={options}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                    />
                </div>
                <button onClick={handelCartButton}
                        className="icon-button cart-toggle">
                    {cart.cart.length > 0 && <div className="cart-counter round">{cart.itemsCount}</div>}
                    <MdOutlineShoppingCart/>
                </button>

                <div>
                    <button className="user-button icon-button"
                            onClick={handelUserButton}>
                        <BiUser/>
                    </button>

                    {showUser &&
                        <UserMenu setShowUser={setShowUser}/>
                    }
                    {cart.showCart && cart.cart.length > 0
                    ||
                    cart.showCart && cart.savedCarts.length > 0 ?
                        <Cart cartItems={cart.cart}
                              total={cart.total}/> : null}
                </div>
            {isUserLog && username && <div className="username container">{username[0].toUpperCase()}</div>}
            </div>
        </>
    );
}

export default HeaderWideScreen;