import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
    let [lock, setLock] = useState("fa-lock");
    let [type, setType] = useState("password");
    let [err, setErr] = useState("");
    let [loud, setLoud] = useState(false);
    let navigate = useNavigate();
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
            name: yup.string().min(2).max(8).required(),
            email: yup.string().email().required(),
            password: yup.string().matches(/^(?=.*\d)(?=.*[A-Z]).{2,}$/, "The first character must be a capital letter and The password must contain at least one number The password must.").required(),
            rePassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").nullable(),
            phone: yup.string().matches(/^(?:\+20|0)?1\d{9}$/, "input a valid Egyptian number"),
        });
        return userSchema;
    }
    let Signup = useFormik({
        initialValues: {
            name: "",
            email: '',
            password: '',
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: (value) => {
            //send to API
            // console.log(value);
            setLoud(true);
            axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
                .then((result) => {
                    setLoud(false);
                    if (result.data.message == "success") {
                        navigate("/log/login");
                    }
                    console.log(result);
                })
                .catch(({ response }) => {
                    console.log(response.data);
                    setErr(response.data.message);
                    setLoud(false);
                })
        }
    })


    return (
        <div className='container'>
            <form onSubmit={Signup.handleSubmit}>
                <h1 className='mb-3 text-main'>Register Now :</h1>
                <div className="position-relative">
                    <label htmlFor="name" className='w-100 my-1 fs-4 fw-bold'>Name :</label>
                    <input type="text" name="name" onChange={Signup.handleChange} id="name" className='w-100 mb-3 form-control' placeholder='Enter Your Name' value={Signup.values.name} />
                    {Signup.errors.name ? <div className="alert alert-danger w-100 text-center"> {Signup.errors.name} </div> : ""}
                </div>
                <div className="position-relative">
                    <label htmlFor="email" className='w-100 my-1 fs-4 fw-bold'>Email :</label>
                    <input type="email" name="email" onChange={Signup.handleChange} id="email" className='w-100 mb-3 form-control' placeholder='example@gmail.com' value={Signup.values.email} />
                    {Signup.errors.email ? <div className="alert alert-danger w-100 text-center"> {Signup.errors.email} </div> : ""}
                </div>
                <div className="position-relative">
                    <label htmlFor="password" className='w-100 mb-1 fs-4 fw-bold' >pass :</label>
                    <input type={type} name="password" onChange={Signup.handleChange} id="password" className='w-100 form-control' placeholder='Enter Your password' value={Signup.values.password} />
                    <i className={`fa-solid ${lock} position cursor-pointer`} onClick={showPass}></i>
                </div>
                {Signup.errors.password ? <div className="alert alert-danger w-100 text-center mt-3"> {Signup.errors.password} </div> : ""}
                <div className="position-relative">
                    <label htmlFor="rePassword" className='w-100 mb-1 fs-4 fw-bold' >rePass :</label>
                    <input type={type} name="rePassword" onChange={Signup.handleChange} id="rePassword" className='w-100 form-control' placeholder='Enter Your rePassword' value={Signup.values.rePassword} />
                </div>
                {Signup.errors.rePassword ? <div className="alert alert-danger w-100 text-center mt-3"> {Signup.errors.rePassword} </div> : ""}
                <div className="position-relative">
                    <label htmlFor="phone" className='w-100 my-1 fs-4 fw-bold'>Phone :</label>
                    <input type="number" name="phone" onChange={Signup.handleChange} id="phone" className='w-100 mb-3 form-control' placeholder='Enter Phone Number' value={Signup.values.phone} />
                    {Signup.errors.phone ? <div className="alert alert-danger w-100 text-center"> {Signup.errors.phone} </div> : ""}
                </div>
                {err ? <p className='alert alert-danger mt-2 text-center'>{err}</p> : ""}
                <div className="d-flex justify-content-end w-100 mt-3 align-items-center">
                    <button className='btn bg-main text-white me-1 mt-3 rounded rounded-pill ' type='submit'>{loud ? <i class="fa-solid fa-spinner fa-spin"></i> : "Signup"}</button>
                </div>
            </form>
        </div>
    )
}

export default Signup