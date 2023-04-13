import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'

const LineChart = ({ data }) => {

    const userData = {
        labels: data.map(el => el.comment_date),
        datasets: [{
            label: "Активность в комментариях",
            data: data.map(el => el.comment_count),
            borderColor: '#4482B9',
            backgroundColor: '#4482B9'

        }]
    }


    return (
        <>
            <Line data={userData} />
        </>
    )
}

export default LineChart;