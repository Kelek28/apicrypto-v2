<template>
  <div>
    <chart id="chart" :chart-data="datacollection"></chart>
  </div>
</template>
    <script>
import Chart from "../chart.js";
export default {
  components: {
    Chart,
  },
  props: {
    coinChartData: { type: Object, required: true },
  },
  data() {
    return {
      labels: this.labelsGenerator,
      datacollection: null,
      coinData: this.coinChartData,
      interval: 24,
    };
  },
  watch: {
    coinChartData() {
      this.labelsGenerator();
      this.fillData();
    },
  },
  mounted() {
    this.labelsGenerator();
    this.fillData();
  },
  methods: {
    labelsGenerator() {
      const labels = [];
      for (let i = 0; i < 168; i += this.interval) {
        let date = new Date();
        date.setHours(date.getHours() - i);
        let dateToPush = `${date.getDay()}.${
          date.getMonth() + 1
        }.${date.getFullYear()} ${date.getHours()}:00`;

        labels.push(dateToPush);
      }
      this.labels = labels;
    },
    fillData() {
      if (typeof this.coinChartData !== undefined) {
        this.datacollection = {
          labels: this.labels,
          datasets: [
            {
              label: "",
              backgroundColor:
                this.coinChartData.market_data.price_change_24h < 0
                  ? "#f87979"
                  : "#90ee90",
              data: this.coinChartData.market_data.sparkline_7d.price
                .filter((value, index) => {
                  return index % this.interval === 0;
                })
                .map((value) => {
                  return Math.round(value * 100) / 100;
                }),
              fill: true,
            },
          ],
        };
      }
    },
  },
};
</script>
