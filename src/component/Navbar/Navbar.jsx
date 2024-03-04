import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg";
import { useContext } from 'react';
import Context, { context } from '../context/Context';
function Navbar() {
    const cart = useContext(context)
    let navigate = useNavigate();
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 start-0 end-0 zIndex">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="home"><img src={logo} alt="logo" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/products">Product</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/brands">Brands</NavLink>
                        </li>
                    </ul>
                    <div className="ms-auto d-flex justify-content-center align-items-center">
                        <h4 className='text-center text-main'>Welcome {localStorage.getItem("Name")}</h4>
                    </div>
                    <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link position-relative me-3" aria-current="page" to="/cart">
                                Cart <i class="fa-solid fa-cart-shopping"></i><span class="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.cart}
                                </span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link position-relative" aria-current="page" to="/wishList">
                                WishList <i class="fa-solid fa-heart"></i><span class="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.whishList}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-0 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="btn rounded-pill bg-main text-white" onClick={() => {
                                localStorage.clear();
                                navigate("/log/login")
                            }}>logout <i class="fa-solid fa-right-from-bracket"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
}

export default Navbar