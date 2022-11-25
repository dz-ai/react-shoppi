import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../store/features/slices/userSlice";
import {useMediaQuery} from "react-responsive";

function UserMenu({setShowUser, handleHomeClick}) {
    const isMobile = useMediaQuery({query: '(max-width: 670px)'});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handelClick = (type) => {

        setShowUser(false);
        isMobile && handleHomeClick('');
        switch (type) {
            case 'login':
                navigate('/login', {state: {name: 'Login'}});
                break
            case 'sign-in':
                navigate('/login', {state: {name: 'Sign-in'}});
                break
            case 'logout':
                dispatch(logOutUser());
                navigate('/');
        }
    };

    return (
        <div className="menu small-menu container">
            <button className="menu-button" onClick={() => handelClick('login')}>login</button>
            <hr/>
            <button className="menu-button" onClick={() => handelClick('logout')}>logout</button>
            <hr/>
            <button className="menu-button" onClick={() => handelClick('sign-in')}>signIn</button>
        </div>
    );
}


export default UserMenu;
