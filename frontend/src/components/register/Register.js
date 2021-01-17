import React, {useEffect, useState} from 'react';
import styles from './Register.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ErrorMsg from '../errormsg/ErrorMsg';
// import Footer from '../Footer/Footer';
import Loading from '../loading/Loading'
import { register } from '../../actions/userActions';


const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const userRegister = useSelector(state => state.userRegister);
    const {loading: regLoading, userInfo: regUser, error: regError} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    // const params = new URLSearchParams(location);
    // const redirect = params ? params.split("=")[1]: '/';
   console.log(userInfo);
    useEffect(() => {
        console.log(userInfo);
        if (userInfo || regUser) {
            props.history.push(redirect);
        }
           return () => {
               //
           }
       }, [props.history, redirect, userInfo, regUser])

    const submitHandler = (e) => {
        e.preventDefault();
       // if(password !== rePassword) {
        //    alert('Password and confirm password do not match')
      //  } else {
            dispatch(register(name, email, password, rePassword));
      //  }
    }

    // return loading ? <div><Loading/></div> :
    // error || !product ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    return(
    <React.Fragment>

        <div className={styles.register}>
        <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Create Account</h2>
                </li>
                <li>
                    {loading && <div><Loading/></div>}
                    {regError && <ErrorMsg variant="danger">{regError}</ErrorMsg>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="rePassword">
                        Re-enter password
                    </label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className={styles.button}>Register</button>
                </li>
                <li className={styles.text}>
                    Already have an account? <Link to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}>Sign-In</Link>
                </li>
            </ul>
            </form>
        </div>
        </div>
        


    {/* <Footer/> */}
    </React.Fragment>
      
    )
}

export default Register;