import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SubCategories() {
    let prams = useParams();
    let [cate, setCate] = React.useState([]);
    async function GetCateDetails(prams) {

        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${prams.id}/subcategories`);
        setCate(data);
    }
    useEffect(() => {
        GetCateDetails(prams)
    }, [])
    return (
        <div className="container mt-5">
            <div className="row g-5">
                {cate?.data?.map((sub) => {
                    return <div className={`col-md-3`} key={sub._id}>
                        <Link to={`/categories/${sub.category}`}>
                            <i className="fa-solid fa-cart-shopping text-main fs-1 w-100 text-center"></i>
                            <h5 className='mt-4 w-100 text-center fw-bold'>{sub.name}</h5>
                        </Link>
                    </div>
                })}
            </div>
        </div>
    )
}
