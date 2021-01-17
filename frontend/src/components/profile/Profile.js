import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
// import { Link } from "react-router-dom";
import cx from "classnames";
import Footer from '../footer/Footer';
import Loading from '../loading/Loading'
import ErrorMsg from '../errormsg/ErrorMsg';
import { logout, update } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password, newPassword }));
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;


  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
    else {

      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    return () => {};
  }, [ userInfo, props.history]);

 

  return ( 
  //   loading ? <div><Loading/></div> : error ? <ErrorMsg variant="danger">{error}</ErrorMsg>
  // :
  // (
    <React.Fragment>
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
              <h2 className={styles.title}>Update Account Info c:</h2>
          <div className={styles.form}>
          
            <form>
              <ul>
       
                <li>
                  {loading && <div><Loading/></div>}
                  {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
                  {success && <ErrorMsg variant="success">Profile Saved Successfully</ErrorMsg>}
                </li>
                <li>
                  <label htmlFor="name">Name</label>
                  <input
                    value={name || ""}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="email">Email</label>
                  <input
                    value={email || ""}
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="password">Verify password</label>
                  <input
                   // value={password || ""}
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </li>

                <li>
                  <label htmlFor="password">New password</label>
                  <input
                 //   value={newPassword || ""}
                    type="password"
                    name="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></input>
                </li>
          <div>
      
                  <button type="submit" className={cx(styles.button, styles.btnUpdate)}>
                    Update
                  </button>
               
         
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={cx(
                      styles.button,
                      styles.secondary,
                      styles.fullWidth
                    )}
                  >
                    Logout
                  </button>
           


          </div>
               
              </ul>
            </form>
          </div>
        </div>
      
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
