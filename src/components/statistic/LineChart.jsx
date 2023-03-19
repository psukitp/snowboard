import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from "react-redux";

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