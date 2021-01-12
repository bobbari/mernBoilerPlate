import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginUserStart } from '../../redux/actions/user.actions'

const Login = () => {
    const dispatch = useDispatch();
    const initalState = { email: "", password: "" }
    const [formhandler, setFormHandler] = useState(initalState);
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormHandler({ ...formhandler, [name]: value })

    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (isValid(formhandler)) {
            console.log("on submit form ", formhandler)
            dispatch(loginUserStart())
            dispatch(loginUser(formhandler))
        } else {
            console.log("error is there please check once")
        }
    }

    const isValid = ({ email, password }) => email && password

    return (
        <div className="container">
            <h3>Registeration</h3>
            <div className="col s12 m4 l8">
                <form className="col s12" onSubmit={onSubmitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" name="email" className="validate" onChange={onChangeHandler} />
                            <label htmlFor="icon_prefix">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">phone</i>
                            <input id="icon_telephone" type="password" name="password" className="validate" onChange={onChangeHandler} />
                            <label htmlFor="icon_telephone">Password</label>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Submit
                                <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
                <p>{JSON.stringify(formhandler, 2)}</p>
            </div >
        </div >
    )
}

export default Login
