import './headerStyles/headerStyle.css';
import {useDispatch, useSelector} from "react-redux";
import {
    cartCounter,
    fetchSavedCart,
    orderZero,
    setTotalPrice,
    showCart
} from "../../../store/features/cartSlice";
import {useEffect, useState} from "react";
import HeaderWideScreen from "./header-wide-screen";
import {useMediaQuery} from "react-responsive";
import HeaderMobileScreen from "./header-mobile-screen";

function Header() {
    const isMobile = useMediaQuery({query: '(max-width: 670px)'});
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const [showUser, setShowUser] = useState(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (user.isLog) {
            dispatch(fetchSavedCart());
        } else {
            dispatch(orderZero())
        }
    }, [user.isLog])

    useEffect(() => {
        dispatch(setTotalPrice());
        dispatch(cartCounter());
    }, [cart.cart]);

    const handelUserButton = () => {
        if (cart.showCart) {
            setShowUser(!showUser);
            dispatch(showCart());
        } else {
            setShowUser(!showUser);
        }
    };

    const handelCartButton = () => {
        if (cart.savedCarts.length > 0) {
            dispatch(showCart());
            return
        }
        if (cart.cart.length !== 0 && showUser) {
            setShowUser(false);
            dispatch(showCart());
        } else {
            dispatch(showCart());
        }
    };

    return (
        <div className="header container">
            <h1>Shoppi</h1>

            {!isMobile && <HeaderWideScreen
                handelCartButton={handelCartButton}
                handelUserButton={handelUserButton}
                setShowUser={setShowUser}
                showUser={showUser}/>}

            {isMobile && <HeaderMobileScreen
                handelCartButton={handelCartButton}
                showBurgerMenu={showBurgerMenu}
                setShowBurgerMenu={setShowBurgerMenu}
                showUser={showUser}
                setShowUser={setShowUser}
                showFilter={showFilter}
                setShowFilter={setShowFilter}/>}
        </div>
    );
};

export default Header;