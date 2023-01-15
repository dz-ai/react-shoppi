import './submitOrderPageStyle.css'
import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCartActions} from "../../store/features/cartSlice/actionsIndex";
import {CreditCard} from "./credit-card";
import {ShippingDetails} from "./shipping-details";


function SubmitOrder() {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const {orderZero, setTotalPrice, cartCounter, submitOrder} = useCartActions();

    const [cardType, setCardType] = useState('visa');
    const [cardNum, setCardNum] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [cvc, setCvc] = useState('');


    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [message, setMessage] = useState('');


    const validDate = (testDate) => {
        const currentYear = new Date().getFullYear().toString().substring(2, 4);
        const currentMonth = new Date().getMonth() + 1;

        let results;

        if (
            testDate.substring(0, 2) <= 12 &&
            testDate.substring(0, 2) > 0 &&
            testDate.substring(2, 4) >= currentYear
        ) {
            if (testDate.substring(2, 4) === currentYear && testDate.substring(0, 2) < currentMonth) {
                results = false;
            } else {
                results = true;
            }

        } else {
            results = false;
        }

        return results;
    };

    const validCard = {
            cardNum: /^\d{16}$/.test(cardNum.replace(/\s/g, '')),
            exDate: /^\d{4}$/.test(expiryMonth + expiryYear) && validDate(expiryMonth + expiryYear),
            cvc: /^\d{3}$/.test(cvc),
        };


    const handelSubmit = () => {
        let allShippingFields = [country, city, street, houseNumber, postalCode];

        allShippingFields.forEach(element => {
            allShippingFields = element !== '';
        });

        if (cart.total === 0) {
            setMessage('You got no items in cart');
            return;
        } else if (!allShippingFields) {
            setMessage('Please fill all Shipping fields');
            return;
        } else if (!validCard.cardNum) {
            setMessage('invalid card number');
            return;
        } else if (!validCard.exDate) {
            setMessage('invalid expire date');
            return;
        } else if (!validCard.cvc) {
            setMessage('invalid CVC number');
            return;
        } else {
            submitOrder({
                products: cart.cart,
                total: cart.total,
                creditCard: {cardType, cardNum, exDate: expiryYear + expiryMonth, cvc}
            });
        }
    };

    const handelContinueShopping = () => {
        orderZero('all');
        navigate('/');
    };

    useEffect(() => {
        setTotalPrice();
        cartCounter();
    }, [cart.cart]);

    return (
        <>
            {cart.orderId === 0 && <div className="submit-order-layout container">
                <header className="container">
                    <p className="total-summit-page-username">
                        {user.username}: You have {cart.itemsCount} {cart.itemsCount > 1 ? 'items' : 'item'} in cart
                    </p>
                    <p className="total-summit-page">Total: {cart.total.toFixed(2)} $</p>
                </header>


                <section className="payment-and-address-section container">

                    <ShippingDetails
                        city={city}
                        country={country}
                        street={street}
                        houseNumber={houseNumber}
                        postalCode={postalCode}
                        handleInputChange={{setCity, setCountry, setStreet, setHouseNumber, setPostalCode}}
                    />


                    <CreditCard
                        cvc={cvc}
                        number={cardNum}
                        expiryYear={expiryYear}
                        expiryMonth={expiryMonth}
                        cardType={cardType}
                        handleInputChange={{setCardType, setCardNum, setExpiryYear, setExpiryMonth, setCvc}}
                    />

                </section>

                {message !== '' && <p className="red-message">{message}</p>}
                {cart.message && <p className="red-message">{cart.message}</p>}

                <button className="button" onClick={handelSubmit}>
                    Buy New
                </button>
            </div>
            }

            {cart.orderId !== 0 &&
                <div className="container container-window">
                    <p>{cart.message}</p>
                    <p>order num: {cart.orderId}</p>
                    <button className="button"
                            onClick={handelContinueShopping}>
                        to continue shopping...
                    </button>
                </div>
            }
        </>
    );
}

export default SubmitOrder;