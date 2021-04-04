<template>
  <div id="app">
    <div class="wrapp">
      <div class="row1">
        <button v-on:click="nowFunc(), (showModal = true)">Добавить</button>
      </div>
      <div class="row2">
        <p>Выбор категории:</p>
        <select id="selected" v-on:change="selOnCh(), schet()">
          <option value="1">Всё</option>
          <option value="2">Отдых</option>
          <option value="3">Еда</option>
          <option value="4">Другое</option>
        </select>
      </div>
      <hr />
      <div class="row3">
        <div class="col1">
          <div class="col1__row0"><h1>Доходы</h1></div>
          <div class="col1__row1">
            <List
              v-for="mas in mass"
              :key="mas.info.id"
              :mas="mas"
              :type="1"
              :selec="selected"
              v-on:rewrite="doRew"
            >
            </List>
          </div>
        </div>
        <div class="col2">
          <div class="col2__row0"><h1>Расходы</h1></div>
          <div class="col2__row1">
            <List
              v-for="mas in mass"
              :key="mas.info.id"
              :mas="mas"
              :type="2"
              :selec="selected"
              v-on:rewrite="doRew"
            ></List>
          </div>
        </div>
      </div>
      <hr />
      <div class="row4">
        <h1>Итого: {{ itigo }}</h1>
      </div>
    </div>
    <div class="modal-wrapp" v-show="showModal">
      <div class="modal">
        <input type="text" id="naz" placeholder="Название" v-model="naz" />
        <input type="text" id="sum" placeholder="Сумма" v-model="sum" />
        <input type="text" id="today" v-model="today" />
        <div class="modal__row1">
          <p>
            <input
              type="radio"
              id="type"
              value="1"
              v-model="type"
              name="dzen"
            />Доход
          </p>
          <p>
            <input
              type="radio"
              value="2"
              v-model="type"
              name="dzen"
              id="type"
            />Расход
          </p>
        </div>
        <div class="modal__row2">
          <select v-model="cat" id="cat">
            <option value="2">Отдых</option>
            <option value="3">Еда</option>
            <option value="4">Другое</option>
          </select>
        </div>
        <div class="modal__row3">
          <textarea id="desc" v-model="desc"></textarea>
        </div>
        <div class="">
          <button type="button" @click="reset(), (showModal = !showModal)">
            close
          </button>
          <button v-if="!id" type="button" @click="plus()">Добавить</button>
          <button v-else type="button" @click="plus(id)">Переписать</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import List from "./components/List";
export default {
  name: "nechto",
  data() {
    return {
      categoria: false,
      showModal: false,
      today: "",
      desc: "",
      sum: "",
      type: "",
      cat: "",
      naz: "",
      mass: [],
      itigo: 0,
      selected: "1",
      id: "",
    };
  },
  components: {
    List,
  },
  methods: {
    doRew: function (info) {
      this.showModal = true;
      this.naz = info.naz;
      this.sum = info.sum;
      this.today = info.today;
      this.desc = info.desc;
      this.type = info.type;
      this.cat = info.cat;
      this.id = info.id;
    },
    plus: function (k) {
      if (!k) {
        let x = localStorage.length;
        let y = 0;
        for (let i = 0; i <= x; i++) {
          if (
            localStorage.key(i) > y &&
            !isNaN(parseInt(localStorage.key(i)))
          ) {
            y = localStorage.key(i);
          }
        }
        y++;
        let smth = new AddInfo(y);
        localStorage.setItem(y, JSON.stringify(smth));
        document.location.reload();
      } else {
        let smth = new AddInfo(k);
        localStorage.setItem(k, JSON.stringify(smth));
        document.location.reload();
      }
    },
    selOnCh: function () {
      this.selected = document.getElementById("selected").value;
    },
    reset: function () {
      (this.desc = ""),
        (this.sum = ""),
        (this.type = ""),
        (this.cat = ""),
        (this.id = ""),
        (this.naz = "");
    },
    nowFunc: function () {
      const today1 = new Date();
      const date =
        today1.getFullYear() +
        "-" +
        (today1.getMonth() + 1) +
        "-" +
        today1.getDate();
      const time =
        today1.getHours() +
        ":" +
        today1.getMinutes() +
        ":" +
        today1.getSeconds();
      this.today = date + " " + time;
    },
    comments: function () {
      let x = localStorage.length;
      let y = 0;
      for (let i = 0; i <= x; i++) {
        if (localStorage.key(i) > y && !isNaN(parseInt(localStorage.key(i)))) {
          y = localStorage.key(i);
        }
      }

      for (let i = 1; i <= y; i++) {
        this.vivod(i);
      }
    },

    vivod: function (i) {
      let smth = JSON.parse(localStorage.getItem(i));
      if (!smth) {
        return;
      }
      this.mass.push(smth);
    },
    schet: function () {
      this.itigo = 0;
      let x = localStorage.length;
      let y = 0;
      for (let i = 0; i <= x; i++) {
        if (localStorage.key(i) > y && !isNaN(parseInt(localStorage.key(i)))) {
          y = localStorage.key(i);
        }
      }
      for (let i = 1; i <= y; i++) {
        let smth = JSON.parse(localStorage.getItem(i));
        if (smth) {
          if (smth.info.cat == this.selected || this.selected == 1) {
            if (smth.info.type == 1) {
              this.itigo = parseInt(this.itigo) + parseInt(smth.info.sum);
            }
            if (smth.info.type == 2) {
              this.itigo = parseInt(this.itigo) - parseInt(smth.info.sum);
            }
          }
        }
      }
    },
  },
  created: function () {
    this.comments();
    this.schet();
  },
};

class AddInfo {
  constructor(i) {
    this.info = {
      id: i,
      today: document.getElementById("today").value,
      desc: document.getElementById("desc").value,
      sum: document.getElementById("sum").value,
      type: document.querySelector('input[name="dzen"]:checked').value,
      cat: document.getElementById("cat").value,
      naz: document.getElementById("naz").value,
    };
  }
}
</script>

<style lang="scss">
.wrapp {
  margin: 20px;
  text-align: center;
}
.dosmth {
  display: block;
}
.row1 {
  margin: 0px 0px 20px 0px;
  button {
    font-size: 24px;
  }
}
.row2 {
  display: inline-flex;
  margin: 0px 0px 20px 0px;
  p {
    margin: 0px 10px 0px 0px;
  }
}
.row3 {
  display: flex;
  justify-content: center;
  h1 {
    margin: 0px 0px 0px 0px;
  }
  .col1 {
    border-right: 2px solid #000;
    padding: 0px 20px 0px 0px;
  }
  .col2 {
    padding: 0px 0px 0px 20px;
  }
  .col1__row0,
  .col2__row0 {
    margin: 0px 0px 20px 0px;
  }
  .col1__row1,
  .col2__row1 {
    text-align: left;
  }
}
.row4 {
  h1 {
    margin: 0px 0px 0px 0px;
  }
}
.modal-wrapp {
  font-size: 16px;
  background-color: rgba(194, 189, 189, 0.9);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .modal {
    background-color: rgb(253, 250, 250);
    width: 50%;
    margin: 0 auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    p {
      margin: 0px 0px 0px 0px;
    }
    .modal__row1 {
      display: flex;
    }
    .modal__row2,
    .modal__row3 {
      text-align-last: left;
    }
  }
}
</style>
