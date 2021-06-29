<template>
  <div class="container">
    <section>
      <form v-on:submit.prevent class="form">
        <label class="form__label" for="formInput">
          <input
            v-model="value"
            @keydown.enter="addCrypto"
            class="form__input"
            type="text"
            name="formInput"
            id="formInput"
            placeholder="Crypto name"
          />
        </label>
        <button @click="addCrypto" type="button" class="form__btn">
          <img src="" alt="" />
          Добавить
        </button>
      </form>
    </section>

    <section>
      <ul class="crypto__list">
        <li
          v-for="crypto in cryptoArray"
          :key="crypto.id"
          @click="selectedCrypto(crypto)"
          :class="{
            active: sel === crypto,
          }"
          class="crypto__list-item"
        >
          <div class="crypto__list-box">
            <h2 class="crypto__list-title">{{ crypto.name }} - USD</h2>
            <div class="crypto__list-price">{{ crypto.price }}</div>
          </div>
          <button
            @click.stop="deleteCrypto(crypto.id)"
            class="crypto__list-btn"
            type="button"
          >
            <svg class="crypto__list-icon">
              <use href="" />
            </svg>
            Delete
          </button>
        </li>
      </ul>
    </section>
    <section v-if="sel">
      <h2 class="graph__title">{{ sel.name }} - USD</h2>
      <div class="graph">
        <div
          v-for="(bar, idx) in normalizeGraph()"
          :key="idx"
          :style="{ height: `${bar}%` }"
          class="graph__item"
        >
          {{ bar.price }}
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import sprite from "./assets/svgSprite/svgSprite.svg"
export default {
  name: "App",
  data() {
    return {
      value: "",
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
      if (this.value !== "") {
        const currentCrypto = {
          id: Date.now(),
          name: this.value,
          price: "-",
        };
        this.requestCrypto(currentCrypto);
        this.cryptoArray.push(currentCrypto);
        this.value = "";
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
<style lang="scss">
@import "./assets/scss/null.scss";

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
}

section + section {
  margin: 20px 0;
  padding: 20px 0;
}

.form {
  &__label {
  }

  &__input {
    padding: 10px;
    border: 1px solid #718096;
    border-radius: 8px;
  }

  &__btn {
    margin-left: 5px;
    background-color: #718096;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
  }
}

.active {
  border-color: green !important;
}

.crypto {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: minmax(170px, auto);
    grid-gap: 10px;

    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border: 4px solid #a0aec0;
    border-radius: 8px;
  }

  &__list-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  &__list-title {
    font-size: 14px;
    color: #a0aec0;
    text-align: center;
    text-transform: uppercase;
  }

  &__list-price {
    font-size: 30px;
    color: #000000;
  }

  &__list-btn {
    display: inline-block;
    text-decoration: none;
    text-align: center;
    margin: 0;
    border: none;
    outline: none;
    text-transform: uppercase;
    white-space: nowrap;
    width: 100%;
    background-color: #a0aec0;
    font-size: 16px;
    color: #ffffff;
    padding: 20px;
    position: relative;

    &:focus {
      outline: none;
    }
  }

  &__list-icon {
    position: absolute;
    width: 20px;
    height: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  height: 200px;
  border-left: 1px solid #000000;
  border-bottom: 1px solid #000000;
  &__title {
    font-size: 16px;
    text-transform: uppercase;
  }

  &__item {
    width: 10px;
    border: 1px solid purple;
    background-color: purple;
  }
  &__item + &__item {
    margin-left: 5px;
  }
}
</style>
