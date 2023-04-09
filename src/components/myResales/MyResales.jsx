import { useEffect, useState } from "react";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { eventApi } from "../../api/eventApi";
import { NavLink } from "react-router-dom";
import { resaleApi } from "../../api/resaleApi";
import ResaleListItem from '../resale/ResaleListItem'
import Pagination from "../pagination/Pagination";
import './myResales.scss'

const MyResales = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const userStatus = useSelector((store) => store.user);
    const userId = userStatus.id;
    const myResales = useSelector((store) => store.myResales);
    const countItemPerPage = 6;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resaleApi.getMyResales(userId))
    }, [])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="main my-resales__main">
                    <section className="my-resales">
                        <div className="my-resales__title">
                            Мои объявления
                        </div>
                        <div className="my-resales__products">
                            {myResales.length > 0 ? null : <div className="my-resales__filler">Ты еще не создал ни одного объявления!</div>}
                            {myResales.map(el =>
                                <NavLink to={`/resale/` + String(el.ad_post_id)}>
                                    <ResaleListItem
                                        ad_image_path={el.ad_image_path}
                                        product_type={el.product_type_name}
                                        ad_post_name={el.post_name}
                                        ad_post_text={el.post_text}
                                        ad_price={el.price?.split(/(?=(?:...)*$)/).join(' ')}
                                        other_props={el} />
                                </NavLink>
                            )}
                        </div>
                        {myResales.length > 0 ? <Pagination countPerPage={countItemPerPage} totalCount={myResales.length} paginate={paginate} currentPagePicked={currentPage} /> : null}
                    </section>
                </div>
                <RegAuthFooter />
            </div >
        </>
    )
}

export default MyResales;