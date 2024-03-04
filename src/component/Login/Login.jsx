import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { context } from '../context/Context';
import { getCart } from '../cart/Cart';
function Login() {
    let userName = useContext(context);
    let navigate = useNavigate();
    let [lock, setLock] = useState("fa-lock");
    let [type, setType] = useState("password");
    let [err, setErr] = useState("");
    let [loud, setLoud] = useState(false);
    let key = true;
    function showPass() {
        if (key) {
            setLock("fa-lock-open");
            setType("text");
            key = false;
        } else {
            setLock("fa-lock");
            setType("password");
            key = true;
        }
    }
    function validationSchema() {
        let userSchema = new yup.object({
            email: yup.string().email().required(),
            password: yup.string().matches(/^(?=.*\d)(?=.*[A-Z]).{2,}$/, "The first character must be a capital letter and The password must contain at least one number The less char password is 2 char.").required()
        });
        return userSchema;
    }
    let login = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (value) => {
            //send to API
            // console.log(value);
            setLoud(true);
            axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)
                .then((result) => {
                    setLoud(false);
                    // console.log();
                    localStorage.setItem('token', result.data.token);
                    navigate("/home");
                    localStorage.setItem("Name", result.data.user.name)
                    
                })
                .catch(({ response }) => {
                    // console.log(response.data.message);
                    setErr(response.data.message)
                    setLoud(false);
                })
        }
    })
    return (
        <div className='container'>
            <form onSubmit={login.handleSubmit}>
                <h1 className='mb-3 text-main'>Login Now :</h1>
                <div className="position-relative">
                    <label htmlFor="email" className='w-100 my-1 fs-4 fw-bold'>Email :</label>
                    <input type="email" name="email" onChange={login.handleChange} id="email" className='w-100 mb-3 form-control' placeholder='example@gmail.com' value={login.values.email} />
                    {login.errors.email ? <div className="alert alert-danger w-100 text-center"> {login.errors.email} </div> : ""}
                </div>
                <div className="position-relative">
                    <label htmlFor="pass" className='w-100 mb-1 fs-4 fw-bold' >pass :</label>
                    <input type={type} name="password" onChange={login.handleChange} id="password" className='w-100 form-control' placeholder='Enter Your Password' value={login.values.password} />
                    <i className={`fa-solid ${lock} position cursor-pointer`} onClick={showPass}></i>
                </div>
                {login.errors.password ? <div className="alert alert-danger w-100 text-center mt-3"> {login.errors.password} </div> : ""}
                {err ? <p className='alert alert-danger mt-2 text-center'>{err}</p> : ""}
                <div className="d-flex justify-content-end w-100 mt-3 align-items-center">
                    <button className='btn bg-main text-white me-1 mt-3 rounded rounded-pill ' type='submit'>{loud ? <i class="fa-solid fa-spinner fa-spin"></i> : "login"}</button>
                </div>
            </form>
        </div>
    )
}

export default Login