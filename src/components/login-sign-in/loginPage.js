import './loginPageStyle.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser, logUser, signUser} from "../../store/features/userSlice";

// This component serve as login and sign-in depend on which pageName it receives
function Login() {
    const location = useLocation();
    const userMessage = useSelector(state => state.user.message)
    const isUserLog = useSelector(state => state.user.isLog)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pageName, setPageName] = useState(location.state.name);
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

    const handleChange = (event, type) => {
        const value = event.target.value;
        switch (type) {
            case 'text':
                setUsername(value);
                break
            case 'email':
                setEmail(value);
                break
            case 'password':
                setPassword(value);
        }
    };

    const handleSubmit = (type) => {
        setSubClicked(true);
        if (type === 'Login') {
            if (validForm.username && validForm.email && validForm.password) {
                dispatch(logUser({username, email, password}))
            }
        } else {
            if (validForm.username && validForm.email && validForm.password) {
                dispatch(signUser({username, email, password}))
            }
        }
    };
    //useEffect navigate to home page when isUserLoge and subClicked is true
    useEffect(() => {
        if (isUserLog && subClicked && location.state.id !== '1') {
            navigate('/');
        } else if (!isUserLog && userMessage === 'not signed user pleas sign in firs') {
            setPageName('Sign-in');
        }   else if (!isUserLog && userMessage === 'you are signed user pleas login') {
            setPageName('Login');
        }  else if (location.state.id === '1' && isUserLog) {
            navigate('/submit');
        }
    }, [isUserLog, subClicked, userMessage]);

    useEffect(() => {
        setPageName(location.state.name)
    },[location.state.name]);

    return (
        <>
            {!isUserLog ? <div className="container login">
                <p className="message">{userMessage}</p>
                <h1>{pageName}</h1>
                <input type="text"
                       placeholder="username"
                       onChange={(event) => handleChange(event, 'text')}
                       value={username}/>
                <input type="email"
                       placeholder="email"
                       onChange={(event) => handleChange(event, 'email')}
                       value={email}/>
                <input type="password"
                       placeholder="password"
                       onChange={(event) => handleChange(event, 'password')}
                       value={password}/>
                <button className="button"
                        onClick={() =>
                            pageName === 'Login' ?
                                handleSubmit('Login')
                                :
                                handleSubmit('signIn')}>
                    {pageName}
                </button>
            </div> :
            <div className="container login">
                <h3>{userMessage}</h3>
                <button className="button" onClick={() => dispatch(logOutUser())}>Logout</button>
            </div>
            }
        </>
    );
}

export default Login;