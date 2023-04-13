import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentApi } from "../../api/commentApi";
import { eventApi } from "../../api/eventApi";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import './statistic.scss'
import * as XLSX from 'xlsx';

const Statistic = () => {
    const dispatch = useDispatch();
    const event_data = useSelector((store) => store.statistic.events)
    const comment_data = useSelector((store) => store.statistic.comments)

    useEffect(() => {
        dispatch(eventApi.getEventsStatistic())
        dispatch(commentApi.getCommentsStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnExportExcel = () => {
        let wb = XLSX.utils.book_new();
        let ws_event = XLSX.utils.json_to_sheet(event_data, { header: ['event_date', 'event_count'] });
        const event_titles = { event_date: 'Дата', event_count: 'Количество мероприятий в день' };
        const event_range = XLSX.utils.decode_range(ws_event['!ref'])
        for (let c = event_range.s.c; c <= event_range.e.c; c++) {
            const header = XLSX.utils.encode_col(c) + '1'
            ws_event[header].v = event_titles[ws_event[header].v]
        }



        let ws_comment = XLSX.utils.json_to_sheet(comment_data);
        const comment_titles = { comment_date: 'Дата', comment_count: 'Активность в комментариях' };
        const comment_range = XLSX.utils.decode_range(ws_comment['!ref'])
        for (let c = comment_range.s.c; c <= comment_range.e.c; c++) {
            const header = XLSX.utils.encode_col(c) + '1'
            ws_comment[header].v = comment_titles[ws_comment[header].v]
        }

        XLSX.utils.book_append_sheet(wb, ws_event, 'Мероприятия');
        XLSX.utils.book_append_sheet(wb, ws_comment, 'Комментарии');
        XLSX.writeFile(wb, 'Статистика_Сноубординг.xlsx')
    }

    return (
        <>
            <Header />
            <section className="statistic">
                <div className="container">
                    <div className="export__btn-block">
                        <button className="snowboard__btn export__btn" onClick={handleOnExportExcel}>Экспортировать данные в Excel</button>
                    </div>
                    <div className="statistic__inner">
                        <div className="statistic__charts">
                            <div className="statistic__charts-bar">
                                <BarChart data={event_data?.sort((a, b) => a.event_date.localeCompare(b.event_date)).sort((a, b) => a.event_date.slice(3, 5).localeCompare(b.event_date.slice(3, 5)))} />
                            </div>
                            <div className="statistic__charts-line">
                                <LineChart data={comment_data.sort((a, b) => a.comment_date.localeCompare(b.comment_date)).sort((a, b) => a.comment_date.slice(3, 5).localeCompare(b.comment_date.slice(3, 5)))} />
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