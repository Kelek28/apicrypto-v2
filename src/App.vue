<template>
  <v-app>
    <navbar
      v-if="coinData"
      :coinData="coinData"
      @coinChange="coinChange"
    ></navbar>
    <v-main>
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
      "bitcoin-cash",
    ],
    coinData: [{ name: " Welcome", id: "welcome", icon: "mdi-human-greeting" }],
  }),
  methods: {
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