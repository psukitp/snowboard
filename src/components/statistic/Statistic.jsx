import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentApi } from "../../api/commentApi";
import { eventApi } from "../../api/eventApi";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import './statistic.scss'

const Statistic = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventApi.getEventsStatistic())
        dispatch(commentApi.getCommentsStatistic())
    }, [])

    const event_data = useSelector((store) => store.statistic.events)
    const comment_data = useSelector((store) => store.statistic.comments)
    return (
        <>
            <Header  />
            <section className="statistic">
                <div className="container">
                    <div className="statistic__inner">
                        <div className="statistic__charts">
                            <div className="statistic__charts-bar">
                                <BarChart data={event_data?.sort((a,b) => a.event_date.localeCompare(b.event_date)).sort((a, b) => a.event_date.slice(3, 5).localeCompare(b.event_date.slice(3, 5)))} />
                            </div>
                            <div className="statistic__charts-line">
                                <LineChart data={comment_data.sort((a,b) => a.comment_date.localeCompare(b.comment_date)).sort((a, b) => a.comment_date.slice(3, 5).localeCompare(b.comment_date.slice(3, 5)))} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RegAuthFooter />
        </>
    )
}

export default Statistic;