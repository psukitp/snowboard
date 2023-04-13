import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'

const BarChart = ({ data }) => {

    const userData = {
        labels: data.map(el => el.event_date),
        datasets: [{
            label: "Количетство мероприятий по дням",
            data: data.map(el => el.event_count),
            backgroundColor: ['#4482B9', '#5651C3', '#3DBF8E', '#FFB751']
        }]
    }

    return (
        <>
            <Bar data={userData} />
        </>
    )
}

export default BarChart;