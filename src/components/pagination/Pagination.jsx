import { useState } from "react";
import './pagination.css'


const Pagination = ({ countPerPage, totalCount, paginate, currentPagePicked }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const maxPage = Math.ceil(totalCount / countPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i)
    }

    const setBold = ({ target }) => {
        const pages = document.querySelectorAll('.page-item');
        pages.forEach(el => el.classList.remove('bold'));
        target.classList.add('bold');
        window.scrollTo(0, 0)
    }

    return (
        <>

            <ul className="pagination">
                <button className="prev-page" onClick={() => {
                    if (currentPage > 1) {
                        paginate(currentPage - 1);
                        setCurrentPage(currentPage - 1)
                        const objectBox = { target: document.getElementById(currentPage - 1) }
                        setBold(objectBox)
                        window.scrollTo(0, 0)
                    }
                }}>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                        <path d="M12 1L2 5.28571L12 11" stroke="#4482B9" strokeLinecap="round" />
                    </svg>

                </button>
                {
                    pageNumbers.map(el => <li className={el === currentPagePicked ? "page-item bold" : "page-item"} id={el} key={el} onClick={(e) => {
                        paginate(el);
                        setCurrentPage(el)
                        setBold(e)
                    }} >
                        {el}
                    </li>)
                }
                <button className="next-page" onClick={() => {
                    if (currentPage < maxPage) {
                        paginate(currentPage + 1);
                        setCurrentPage(currentPage + 1)
                        const objectBox = { target: document.getElementById(currentPage + 1) }
                        setBold(objectBox)
                        window.scrollTo(0, 0)
                    }
                }}>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                        <path d="M1 11L11 6.71429L1 1" stroke="#4482B9" strokeLinecap="round" />
                    </svg>

                </button>
            </ul>

        </>
    )
}

export default Pagination;