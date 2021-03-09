
<template>
  <v-container
    fluid
    class="grey lighten-5"
    fill-height
    id="viewCoin"
    v-if="loaded"
  >
    <v-row>
      <v-col cols="12" sm="5">
        <Chart
          v-if="coinData.market_data"
          id="chart"
          :coinChartData="coinData"
        ></Chart>
      </v-col>
      <v-col cols="12" sm="7" v-if="coinData">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="3"
                lg="3"
              >
                <v-card v-if="item.data">
                  <v-card-title :class="UpOrDown">
                    {{ item.name }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        {{ item.data }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import Chart from "./Chart";
import axios from "axios";
export default {
  components: {
    Chart,
  },
  props: {
    coinId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
      itemsPerPage: 12,
      coinData: {},
      options: {
        type: Object,
        default: null,
      },
    };
  },
  // if id of coin will change we need to make new API call
  watch: {
    coinId() {
      this.getCoinInfo();
    },
  },
  computed: {
    // If in last 24hr price go down cards and chart are red if up green
    UpOrDown() {
      if (this.coinData.market_data.price_change_percentage_24h < 0) {
        return "error";
      }
      return "success";
    },
    // creating fields which we want to show
    items() {
      var items = [
        {
          name: "Name",
          data: this.coinData.name,
        },
        {
          name: "Price",
          data:
            "$ " +
            this.number_format(this.coinData.market_data.current_price.usd, 2),
        },
        {
          name: "Market Cap Rank",
          data: this.coinData.market_cap_rank,
        },
        {
          name: "Market Cap",
          data:
            "$ " + this.number_format(this.coinData.market_data.market_cap.usd),
        },
        {
          name: "Volume",
          data:
            "$ " +
            this.number_format(this.coinData.market_data.total_volume.usd),
        },
        {
          name: "Price change 24h",
          data:
            this.number_format(
              this.coinData.market_data.price_change_percentage_24h,
              2
            ) + "%",
        },
        {
          name: "All time High",
          data: this.number_format(this.coinData.market_data.ath.usd, 2),
        },
        {
          name: "All time high change",
          data:
            this.number_format(
              this.coinData.market_data.ath_change_percentage.usd,
              2
            ) + "%",
        },
        {
          name: "Max Supply",
          data: this.number_format(this.coinData.market_data.total_supply),
        },
        {
          name: "Circulating supply",
          data: this.number_format(
            this.coinData.market_data.circulating_supply
          ),
        },
        {
          name: "symbol",
          data: this.coinData.symbol.toUpperCase(),
        },
        {
          name: "Genesis date",
          data: this.coinData.genesis_date,
        },
      ];
      return items;
    },
  },
  methods: {
    number_format(number, decimals, decPoint, thousandsSep) {
      number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
      const n = !isFinite(+number) ? 0 : +number;
      const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
      const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
      const dec = typeof decPoint === "undefined" ? "." : decPoint;
      let s = "";
      const toFixedFix = function (n, prec) {
        if (("" + n).indexOf("e") === -1) {
          return +(Math.round(n + "e+" + prec) + "e-" + prec);
        } else {
          const arr = ("" + n).split("e");
          let sig = "";
          if (+arr[1] + prec > 0) {
            sig = "+";
          }
          return (+(
            Math.round(+arr[0] + "e" + sig + (+arr[1] + prec)) +
            "e-" +
            prec
          )).toFixed(prec);
        }
      };
      // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(
        "."
      );
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    },
    getCoinInfo() {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${this.coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
        )
        .then((res) => {
          this.coinData = res.data;
          this.loaded = true;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getCoinInfo();
  },
};
</script>

<style >
#chart {
  width: 100%;
}
#card {
  float: left;
  display: flex;
}
#viewCoin {
  height: 100%;
}
v-col {
  background: blue;
}
</style>