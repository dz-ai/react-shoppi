import UserMenu from "../../login-sign-in/user-menu";
import Cart from "../../cart/cart";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useProductsActions} from "../../../store/features/productsSlice/actionsIndex";
import Dropdown from "./dropdown";

function HeaderWideScreen({
                              handleHomeButton,
                              handelCartButton,
                              showUser,
                              setShowUser,
                              category
                          }) {
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const username = useSelector(state => state.user.username);
    const isUserLog = (state => state.user.isLog);

    const {categoryFilter} = useProductsActions();
    const {options, categoryValue, setCategoryValue} = category;

    useEffect(() => {
        categoryFilter(products.category);
    }, [products.category]);

    useEffect(() => {
        categoryFilter(categoryValue);
    }, [categoryValue]);


    return (
        <>
            <div className="header-content-wrapper container">

                <nav onClick={handleHomeButton} className="button navButton">Home</nav>

                <div style={{width: "200px", marginLeft: "5px"}}>
                    <Dropdown
                        options={options}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                    />
                </div>

                <Cart
                    cartItems={cart.cart}
                    total={cart.total}
                    handleCartButton={handelCartButton}
                />

                        <UserMenu
                            showUser={showUser}
                            setShowUser={setShowUser}
                        />

                {isUserLog && username && <div className="username container">{username[0].toUpperCase()}</div>}
            </div>
        </>
    );
}

export default HeaderWideScreen;