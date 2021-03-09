<template>
  <v-app>
    <navbar
      v-if="coinData && !isFormOpen"
      :coinData="coinData"
      @coinChange="coinChange"
      @deleteCoinId="deleteCoinId"
      @addCoinId="addCoinId"
    ></navbar>
    <v-main v-if="!isFormOpen">
      <welcome-page v-if="!coinDataToPass" />
      <viewOfCoin v-if="coinDataToPass" :coinId="coinDataToPass"></viewOfCoin>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";
import viewOfCoin from "./components/viewOfCoin";
import axios from "axios";
import WelcomePage from "./components/WelcomePage.vue";
export default {
  components: {
    navbar,
    WelcomePage,
    viewOfCoin,
  },
  data: () => ({
    isFormOpen: false,
    coinDataToPass: null,
    coinsStart: [
      "bitcoin",
      "litecoin",
      "ethereum",
      "cardano",
      "uniswap",
      "tether",
      "polkadot",
      "ripple",
      "chainlink",
    ],
    coinData: [{ name: " Welcome", id: "welcome", icon: "mdi-human-greeting" }],
  }),
  methods: {
    deleteCoinId(value) {
      console.log(this.coinsStart);
      this.coinsStart = this.coinsStart.filter((e) => e !== value);
      this.coinData = this.coinData.filter(function (obj) {
        return obj.id !== value;
      });
      console.log(this.coinsStart);
    },
    addCoinId(value) {
      if (!this.coinsStart.includes(value) && value) {
        this.coinsStart.push(value);
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${value}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
          )
          .then((res) => {
            this.coinData.push(res.data);
            alert("Coin added succesfully");
          })
          .catch((err) => {
            console.log(err);
            alert("Error");
          });
      }
    },
    addCoinFormOpen() {
      this.isFormOpen = true;
    },
    coinChange(value) {
      this.coinDataToPass = null;
      if (value !== "welcome") {
        this.coinDataToPass = value;
      }
    },
  },

  mounted() {
    for (let i = 0; i < this.coinsStart.length; i++) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${this.coinsStart[i]}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
        )
        .then((res) => {
          this.coinData.push(res.data);
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>