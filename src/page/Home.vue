<template>
  <div class="container">
    <section>
      <form v-on:submit.prevent class="form">
        <my-input
          v-model="ticker"
          class="form__input"
          placeholder="Crypto name"
          @keydown.enter="addCrypto"
        />
        <my-button @click="addCrypto" type="button" class="form__btn">
          Добавить
        </my-button>
      </form>
    </section>

    <section v-if="cryptoArray.length">
      <crypto-list
        :crypto-array="cryptoArray"
        :sel="sel"
        @remove="deleteCrypto"
        @selectedCrypto="selectedCrypto"
      />
    </section>

    <section v-if="sel">
      <Graph :normalize-graph="normalizeGraph" :sel="sel" />
    </section>
  </div>
</template>
<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import CryptoList from "../components/CryptoList";
import Graph from "../components/Graph";

export default {
  name: "Home",
  components: { Graph, CryptoList, MyButton, MyInput },
  data() {
    return {
      ticker: "",
      cryptoArray: [],
      graph: [],
      sel: null,
    };
  },
  created() {},
  methods: {
    requestCrypto(currentCrypto) {
      setInterval(async () => {
        const f = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${currentCrypto.name}&tsyms=USD&api_Key=process.env.VUE_APP__API_KEY`
        );
        const data = await f.json();
        this.cryptoArray.find((itemTicker) => {
          if (itemTicker.name === currentCrypto.name) {
            itemTicker.price =
              data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);
          }
          if (this.sel?.name === currentCrypto.name) {
            this.graph.push(data.USD);
          }
        });
      }, 5000);
    },
    addCrypto() {
      if (this.ticker !== "") {
        const currentCrypto = {
          id: Date.now(),
          name: this.ticker,
          price: "-",
        };
        this.requestCrypto(currentCrypto);
        this.cryptoArray.push(currentCrypto);
        this.ticker = "";
      }
    },
    deleteCrypto(cryptoId) {
      this.cryptoArray = this.cryptoArray.filter(
        (item) => item.id !== cryptoId
      );
    },
    selectedCrypto(crypto) {
      this.sel = crypto;
      this.graph = [];
    },
    normalizeGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      return this.graph.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },
  },
};
</script>
<style lang="scss"></style>
