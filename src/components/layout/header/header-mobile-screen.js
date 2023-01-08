import './headerStyles/headerMobileStyle.css';
import {BiMenu} from "react-icons/bi";
import {MdOutlineShoppingCart} from "react-icons/md";
import {useSelector} from "react-redux";
import Cart from "../../cart/cart";
import UserMenu from "../../login-sign-in/user-menu";
import {useNavigate} from "react-router-dom";
import {useProductsActions} from "../../../store/features/productsSlice/actionsIndex";
import Dropdown from "./dropdown";
import {useEffect, useState} from "react";


function HeaderMobileScreen(
    {handelCartButton, showBurgerMenu, setShowBurgerMenu, setShowUser, showUser, showFilter, setShowFilter}) {

    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const username = useSelector(state => state.user.username);
    const isUserLog = (state => state.user.isLog);

    const options = ["Select Category", "electronics", "jewelery", "men's clothing", "women's clothing"]
    const [categoryValue, setCategoryValue] = useState(options[0]);

    const {categoryFilter} = useProductsActions();

    const handleHomeClick = (type) => {
            setShowBurgerMenu(false);
            type === 'home' && navigate('/');
    };

    useEffect(() => {
        setShowBurgerMenu(false);
        setShowFilter(false);
        categoryFilter(categoryValue);
    }, [categoryValue]);

    return (
        <>
            <div className="header-content-wrapper container">
                <button onClick={handelCartButton}
                        className="icon-button cart-toggle">
                    {cart.cart.length > 0 && <div className="cart-counter round">{cart.itemsCount}</div>}
                    <MdOutlineShoppingCart/>
                </button>

                {cart.showCart && cart.cart.length > 0
                    ||
                    cart.showCart && cart.savedCarts.length > 0 ?
                        <Cart cartItems={cart.cart}
                              total={cart.total}/> : null
                }

                <button className="icon-button-Header-burger"
                        onClick={() => setShowBurgerMenu(!showBurgerMenu)}>
                    <BiMenu/>
                </button>

                 {isUserLog && username && <div className="username container">{username[0].toUpperCase()}</div>}
            </div>


            {showBurgerMenu &&
                <div className="menu container">

                    <button className="menu-button" onClick={() => handleHomeClick('home')}>
                        Home
                    </button>
                    <hr/>
                            <Dropdown
                                options={options}
                                categoryValue={categoryValue}
                                setCategoryValue={setCategoryValue}
                            />
                    <hr/>

                    <button className="menu-button"
                            onClick={() => setShowUser(!showUser)}>
                        Login/Logout
                        {showUser &&
                            <UserMenu setShowUser={setShowUser}
                                      handleHomeClick={handleHomeClick}/>
                        }
                    </button>
                    <hr/>
                </div>
            }
        </>
    );
}

export default HeaderMobileScreen;