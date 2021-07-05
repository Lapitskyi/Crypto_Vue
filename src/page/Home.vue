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
      <ul class="options__list" v-if="searchCrypto.length">
        <li
          v-for="find in searchCrypto.splice(0, 4)"
          :key="find.id"
          class="options__list-item"
        >
          <span>{{ find.Symbol }}</span>
        </li>
      </ul>
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
import { requireCryptoAll, subscribeToTicker } from "../service/Api";

export default {
  name: "Home",
  components: { Graph, CryptoList, MyButton, MyInput },
  data() {
    return {
      ticker: "",
      cryptoArray: [],
      graph: [],
      sel: null,
      allTickers: [],
    };
  },
  created() {
    this.getAllTikers();
  },
  computed: {
    searchCrypto() {
      return [...this.allTickers].filter((item) => {
        if (this.ticker !== "") {
          return item.Symbol.toLowerCase().includes(this.ticker.toLowerCase());
        }
      });
    },
  },

  methods: {
    addCrypto() {
      if (this.ticker !== "") {
        const currentCrypto = {
          id: Date.now(),
          name: this.ticker,
          price: "-",
        };
        setInterval(async () => {
          await subscribeToTicker(currentCrypto, (newPrice) =>
            this.cryptoArray.find((itemTicker) => {
              if (itemTicker.name === currentCrypto.name) {
                itemTicker.price =
                  newPrice.USD > 1
                    ? newPrice.USD.toFixed(2)
                    : newPrice.USD.toPrecision(2);
              }
              if (this.sel?.name === currentCrypto.name) {
                this.graph.push(newPrice.USD);
              }
            })
          );
        }, 5000);

        this.cryptoArray.push(currentCrypto);
        this.ticker = "";
        localStorage.setItem(
          "cryptonomicon-list",
          JSON.stringify(this.cryptoArray)
        );
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
        (price) => 10 + ((price - minValue) * 90) / (maxValue - minValue)
      );
    },
    getAllTikers() {
      requireCryptoAll((t) => {
        const tickersCryptoAll = new Object(Object.values(t));
        this.allTickers = [...tickersCryptoAll];
      });
    },
  },
  watch: {
    cryptoArray() {
      localStorage.setItem(
        "cryptonomicon-list",
        JSON.stringify(this.cryptoArray)
      );
    },
  },
};
</script>
<style lang="scss">
.options {
  &__list {
    width: max-content;
    border-radius: 10px;
    border: 1px solid #a0aec0;
    padding: 5px;
    display: flex;
  }

  &__list-item + &__list-item {
    margin-left: 2px;
  }

  &__list-item {
    border-radius: 10px;
    border: 1px solid #a0aec0;
    padding: 3px 10px;

    span {
      font-size: 12px;
      text-transform: uppercase;
      color: #000000;
    }
  }
}
</style>
