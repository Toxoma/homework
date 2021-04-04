<template>
  <div
    class="dosmth"
    v-if="mas.info.type == type && (mas.info.cat == selec || selec == 1)"
    v-bind:id="mas.info.id"
  >
    <div class="com">
      <div class="com__row1">{{ mas.info.naz }}</div>
      <hr />
      <div class="com__row2">
        <div class="com__row2__col1">Дата: {{ mas.info.today }}</div>
        <div :class="['com__row2__col2', type == 1 ? 'green' : 'red']">
          Сумма: {{ mas.info.sum }}
        </div>
      </div>
      <div class="com__row3">Категория: {{ mas.info.cat }}</div>
      <div class="com__row4">{{ mas.info.desc }}</div>
    </div>

    <div class="btns">
      <button class="btn rew" @click="rew(mas.info)">rew</button>
      <button class="btn del" @click="del(mas.info.id)">del</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["mas", "type", "selec"],
  methods: {
    del: function (i) {
      localStorage.removeItem(i);
      document.location.reload();
    },
    rew: function (i) {
      this.$emit("rewrite", i);
    },
  },
};
</script>

<style lang="scss" scoped>
.dosmth {
  margin: 0px 0px 30px 0px;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 10px;
}
.com {
  .com__row1 {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .com__row2 {
    margin-bottom: 10px;
  }
  .com__row3 {
    margin-bottom: 10px;
  }
  .com__row4 {
    margin-bottom: 10px;
  }
}
.btns {
  width: 100%;

  text-align: center;
  .rew {
    margin: 0px 20px 0px 0px;
  }
}
.com__row2 {
  display: flex;
  .com__row2__col1 {
    margin: 0px 20px 0px 0px;
  }
  .green {
    background-color: rgb(16, 219, 77);
  }
  .red {
    background-color: red;
  }
}
</style>