import './headerStyles/headerStyle.css';
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import HeaderWideScreen from "./header-wide-screen";
import {useMediaQuery} from "react-responsive";
import HeaderMobileScreen from "./header-mobile-screen";
import {useCartActions} from "../../../store/features/cartSlice/actionsIndex";
import {useLocation, useNavigate} from "react-router-dom";

function Header() {
    const isMobile = useMediaQuery({query: '(max-width: 670px)'});

    const location = useLocation();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const {fetchSavedCart, orderZero, setTotalPrice, cartCounter, showCartFun} = useCartActions();

    const options = ["All Categories", "electronics", "jewelery", "men's clothing", "women's clothing"];
    const [categoryValue, setCategoryValue] = useState(options[0]);

    const [showUser, setShowUser] = useState(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (user.isLog) {
            fetchSavedCart();
        } else {
            orderZero();
        }
    }, [user.isLog])

    useEffect(() => {
        setTotalPrice();
        cartCounter();
    }, [cart.cart]);

    const handelUserButton = () => {
        if (cart.showCart) {
            setShowUser(!showUser);
            showCartFun();
        } else {
            setShowUser(!showUser);
        }
    };

    const handelCartButton = () => {
        if (cart.savedCarts.length > 0) {
            showCartFun();
            return
        } else if (cart.cart.length > 0) {
            showCartFun();
            return
        }
        if (cart.cart.length > 0 && showUser) {
            setShowUser(false);
            showCartFun();
        }
    };

    const handleHomeButton = () => {
        setShowBurgerMenu(false);

        if (location.pathname === "/submit" && cart.orderId !== 0) {
            navigate('/');
            orderZero('all');
        } else {
            navigate('/');
        }
    }

    const ref = useRef(null);

    return (
        <div className="header container" ref={ref}>
            <h1>Shoppi</h1>

            {!isMobile &&
                <HeaderWideScreen
                    handleHomeButton={handleHomeButton}
                    handelCartButton={handelCartButton}
                    handelUserButton={handelUserButton}
                    setShowUser={setShowUser}
                    showUser={showUser}
                    category={{options, categoryValue, setCategoryValue}}
                />}

            {isMobile &&
                <HeaderMobileScreen
                    handleHomeButton={handleHomeButton}
                    handelCartButton={handelCartButton}
                    showBurgerMenu={showBurgerMenu}
                    setShowBurgerMenu={setShowBurgerMenu}
                    showUser={showUser}
                    setShowUser={setShowUser}
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    category={{options, categoryValue, setCategoryValue}}
                />}
        </div>
    );
};

export default Header;