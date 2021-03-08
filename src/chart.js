import {
    Line,
    mixins
} from 'vue-chartjs'

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data() {
        return {

            options: {
                responsive: true,
                //Chart.js options
                scales: {
                    yAxes: [{
                        scaleShowLabels: true,

                        display: true,
                        ticks: {
                            display: true,

                            beginAtZero: false
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false,
                        },
                    }]
                },
                legend: {
                    display: false
                },
                title: {

                    display: false
                },
                scaleLabel: {
                    display: false
                },
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }

}