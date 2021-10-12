<template>
  <section>
    <h1>{{ title }}</h1>
    <p style="color: #999; font-size: 90%">
      hint: try typing an @ followed by the name of a star wars character
    </p>
    <div class="form">
      <input
        :value="newItemValue"
        @input="changeNewItemValue"
        @keydown.down="nextPerson"
        @keydown.up="previousPerson"
        @keydown.enter="selectPerson(foundPeople[selectedPerson - 1])"
        placeholder="Add a new thing to do, Luke"
      />
      <button v-on:click="addToList">
        <AddTask />
      </button>
      <ol v-if="foundPeople.length > 0">
        <li
          v-bind:key="person"
          v-for="(person, index) in foundPeople"
          v-bind:class="index + 1 === selectedPerson ? 'selected' : ''"
          v-on:click="selectPerson(foundPeople[index])"
        >
          {{ person.name }}
        </li>
      </ol>
    </div>
    <ul>
      <li
        v-bind:key="item"
        v-for="item in items"
        :data-item-id="item.id"
        v-bind:class="item.checked ? 'checked' : 'unchecked'"
      >
        <SquareIcon
          v-if="!item.checked"
          class="icon"
          v-on:click="toggleChecked(item.id)"
        />
        <CheckedSquareIcon
          v-if="item.checked"
          class="icon"
          v-on:click="toggleChecked(item.id)"
        />
        <span>
          {{ item.title }}
        </span>
        <TrashCanIcon v-on:click="removeItem(item.id)" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { store } from '../main';

export default defineComponent({
  name: 'TodoList',
  methods: {
    changeNewItemValue: (event: { target: { value: string } }) => {
      const value = event.target.value;
      const atString =
        value.indexOf('@') !== -1
          ? value.substring(value.indexOf('@') + 1, value.length)
          : false;

      if (atString) {
        axios
          .get(`https://swapi.dev/api/people/?search=${atString}`)
          .then((response: { data: { results: [] } }) => {
            store.commit('saveFoundPeople', response.data.results);
          });
      } else {
        store.commit('saveFoundPeople', []);
      }
      store.commit('changeNewItemValue', value);
    },
    addToList: () => {
      store.commit('addListItem');
      store.commit('changeNewItemValue', '');
    },
    toggleChecked: (id: number) => {
      store.commit('toggleChecked', id);
    },
    removeItem: (id: number) => {
      store.commit('removeItem', id);
    },
    previousPerson: (event: KeyboardEvent) => {
      event.preventDefault();
      store.commit('previousPerson');
    },
    nextPerson: (event: KeyboardEvent) => {
      event.preventDefault();
      store.commit('nextPerson');
    },
    selectPerson: (person: { name: string }) => {
      const currentInput = store.state.newItemValue;
      const atString =
        currentInput.indexOf('@') !== -1
          ? currentInput.substring(
              currentInput.indexOf('@'),
              currentInput.length
            )
          : false;

      if (atString) {
        const newInput = currentInput.replace(atString, person.name);
        store.commit('changeNewItemValue', newInput);
      }

      store.commit('saveFoundPeople', []);
      store.commit('resetSelectedPerson');
    },
  },
  computed: {
    ...mapState({
      items: 'items',
      newItemValue: 'newItemValue',
      foundPeople: 'foundPeople',
      selectedPerson: 'selectedPerson',
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
ol,
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
ol {
  position: absolute;
  border: 1px solid #fea731;
  background-color: #fff;
  top: 100%;
  right: 0;
  left: 0;
  margin: 0;
  li {
    padding: 10px;
    &.selected {
      background-color: #fea731;
    }
  }
}
ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }

  &.checked span {
    text-decoration: line-through;
  }

  .icon {
    cursor: pointer;
    margin-right: 10px;
  }

  span {
    display: flex;
    flex-grow: 1;
  }
}
.form {
  position: relative;
  display: flex;

  button {
    flex-grow: 0;
    margin-left: 10px;
    background-color: #fea731;
    border: 0;

    &:hover {
      cursor: pointer;
    }
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
