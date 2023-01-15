import './loginPageStyle.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {handleKeypress} from "../../Utils-and-Hooks/pressEnterHandle";
import {useUserActions} from "../../store/features/userSlice/actionsIndex";

// This component serve as login and sign-in depend on which pageName it receives
function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const userMessage = useSelector(state => state.user.message);
    const isUserLog = useSelector(state => state.user.isLog);

    const {signUser, logUser, logOutUser} = useUserActions();

    const [pageName, setPageName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subClicked, setSubClicked] = useState(false);

    // validForm is make sure all fields in form are filled correctly
    const validForm = {
        username: username.length > 3,
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        password: /^\w{6,10}$/.test(password),
    };

    const handleSubmit = (type) => {
        setSubClicked(true);
        if (type === 'Login') {
            if (validForm.username && validForm.email && validForm.password) {
                logUser({username, email, password});
            }
        }

        if (type === 'Sign-in') {
            if (validForm.username && validForm.email && validForm.password) {
                signUser({username, email, password});
            }
        }
    };
    useEffect(() => {
        let namePage;
        if (!location.state) {
            namePage = 'Sign-in';
        } else {
            namePage = location.state.name
        }
        setPageName(namePage)
    }, [location.state && location.state.name]);

    //useEffect navigate to home page when isUserLoge and subClicked is true
    useEffect(() => {
        if (isUserLog && subClicked && location.state && location.state.id !== '1') {
            navigate('/');
        }
        if (!isUserLog && userMessage === 'not a signed user please sign in first (or check email spelling)') {
            setPageName('Sign-in');
        }
        if (!isUserLog && userMessage === 'you are a signed user please login') {
            setPageName('Login');
        }
        if (location.state && location.state.id === '1' && isUserLog) {
            navigate('/submit');
        }
    }, [isUserLog, subClicked, userMessage]);


    return (
        <div onKeyDown={(e) => handleKeypress(e, handleSubmit, pageName)}>
            {!isUserLog ?
                <div className="container login">
                    <p className="message">{userMessage}</p>
                    <h1>{pageName}</h1>
                    <input type="text"
                           placeholder="3 letters username"
                           onChange={(event) => setUsername(event.target.value)}
                           value={username}/>
                    <input type="email"
                           placeholder="email"
                           onChange={(event) => setEmail(event.target.value)}
                           value={email}/>
                    <input type="password"
                           placeholder="password"
                           onChange={(event) => setPassword(event.target.value)}
                           value={password}/>

                    <button className="button"
                            onClick={() => handleSubmit(pageName)}>
                        {pageName}
                    </button>
                </div>
                :
                <div className="container login">
                    <h3>{userMessage}</h3>
                    <button className="button"
                            onClick={() => logOutUser()}>Logout
                    </button>
                </div>
            }
        </div>
    );
}

export default Login;