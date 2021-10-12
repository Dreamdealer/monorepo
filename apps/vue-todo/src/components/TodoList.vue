<template>
  <section>
    <h1>{{ title }}</h1>
    <div class="form">
      <input
        :value="newItemValue"
        @input="changeNewItemValue"
        placeholder="Add a new thing to do, Luke"
      />
      <button v-on:click="addToList">
        <AddTask />
      </button>
    </div>
    <ul>
      <li v-bind:key="item" v-for="item in items">
        <SquareIcon v-if="!item.checked" class="icon" />
        <CheckedSquareIcon v-if="item.checked" class="icon" />
        {{ item.title }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { store } from '../main';

export default defineComponent({
  name: 'TodoList',
  methods: {
    changeNewItemValue: (event: { target: { value: string } }) => {
      store.commit('changeNewItemValue', event.target.value);
    },
    addToList: () => {
      store.commit('addListItem');
      store.commit('changeNewItemValue', '');
    },
  },
  computed: {
    ...mapState({
      items: 'items',
      newItemValue: 'newItemValue',
    }),
  },
  props: {
    title: String,
  },
});
</script>

<style scoped lang="scss">
section {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  margin: 0 10px;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 10px;
  }
}
a {
  color: #42b983;
}
.form {
  display: flex;

  button {
    flex-grow: 0;
    margin-left: 10px;
    background-color: #42b983;
    border: 0;
  }

  input {
    flex-grow: 1;
  }
}
input,
button {
  display: flex;
  line-height: 40px;
  padding: 0 10px;
  font-size: inherit;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: 1px solid #666;

  &:focus {
    outline: none;
  }
}
</style>
