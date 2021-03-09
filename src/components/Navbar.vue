<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-list-item-group
          v-model="selectedItemIndex"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(coin, index) in coinData" :key="index">
            <v-list-item-icon v-if="index === 0">
              <v-icon> {{ coin.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-if="coin.image">
              <v-img :src="coin.image.thumb"></v-img>
            </v-list-item-icon>
            <v-list-item-title> {{ coin.name }}</v-list-item-title>
            <v-list-item-icon
              v-if="coin.id !== 'welcome'"
              @click="deleteCoinForm(coin)"
            >
              <v-icon id="bin">mdi-delete</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" @click="addCoinForm"> Add coin </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="green" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="selectedCoinProp">
        {{ selectedCoinProp.name }}</v-toolbar-title
      >
    </v-app-bar>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
      z-index="10"
    >
      <!-- Delete coin form -->
      <v-card class="pa-5" outlined v-if="deleteCoinState">
        <v-card-title class="headline">
          Delete {{ coinToDeleteAdd.name }}?
        </v-card-title>
        <v-card-text>Do you want to delete it</v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="deleteCoin"> Delete </v-btn>
          <v-btn
            color="error"
            @click="(overlay = false), (deleteCoinState = false)"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- Add coin form -->
      <v-card class="pa-5" outlined v-if="addCoinState">
        <v-card-title class="headline"> Add coin </v-card-title>
        <v-form>
          <v-select
            v-model="selected"
            :items="allCoins"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-form>
        <v-card-actions>
          <v-btn color="success" @click="AddCoin"> Add coin </v-btn>
          <v-btn
            color="error"
            @click="(overlay = false), (addCoinState = false)"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    coinData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      absolute: true,
      opacity: 1,
      overlay: false,
      coinToDeleteAdd: {
        id: "",
        name: "",
      },
      addCoinState: false,
      selectedItemIndex: 0,
      drawer: false,
      deleteCoinState: false,
      selected: "",
      allCoins: [],
    };
  },
  watch: {
    selectedItemIndex() {
      this.drawer = false;
      this.$emit("coinChange", this.selectedCoinProp.id);
    },
  },
  methods: {
    deleteCoinForm(value) {
      this.coinToDeleteAdd.id = value.id;
      this.coinToDeleteAdd.name = value.name;
      this.overlay = true;
      this.deleteCoinState = true;
    },
    deleteCoin() {
      this.deleteCoinState = false;
      this.selectedItemIndex = 0;
      this.overlay = false;
      this.$emit("deleteCoinId", this.coinToDeleteAdd.id);
    },
    addCoinForm() {
      this.overlay = true;
      this.addCoinState = true;
    },
    AddCoin() {
      this.addCoinState = false;
      this.selectedItemIndex = 0;
      this.overlay = false;
      this.$emit("addCoinId", this.selected);
    },
  },
  computed: {
    selectedCoinProp() {
      if (this.selectedItemIndex === undefined) {
        return this.coinData[0];
      }
      return this.coinData[this.selectedItemIndex];
    },
  },
  mounted() {
    axios
      .get("https://api.coingecko.com/api/v3/coins/list?include_platform=false")
      .then((res) => {
        this.allCoins = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#bin:hover {
  color: red;
}
#card {
  z-index: 100;
}
</style>