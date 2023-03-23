import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentApi } from "../../api/commentApi";
import { eventApi } from "../../api/eventApi";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import './statistic.css'

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
            <Header bgColor='#F8FAFC'/>
            <section className="statistic">
                <div className="container">
                    <div className="statistic__inner">
                        <div className="statistic__charts">
                            <div className="statistic__charts-bar">
                                <BarChart data={event_data} />
                            </div>
                            <div className="statistic__charts-line">
                                <LineChart data={comment_data} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RegAuthFooter bgColor='#F8FAFC'/>
        </>
    )
}

export default Statistic;