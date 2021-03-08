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
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="green" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="selectedCoinProp">{{
        selectedCoinProp.name
      }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    coinData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedItemIndex: 0,
      drawer: false,
    };
  },
  watch: {
    selectedItemIndex() {
      this.drawer = false;
      this.$emit("coinChange", this.selectedCoinProp.id);
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
};
</script>

<style>
</style>