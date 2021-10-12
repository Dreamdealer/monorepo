import { createApp, InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import App from './App.vue';
import router from './router';

import { CarbonIconsVue } from '@carbon/icons-vue';
import SquareIcon from '@carbon/icons-vue/es/checkbox/32';
import CheckedSquareIcon from '@carbon/icons-vue/es/checkbox--checked/32';
import AddTask from '@carbon/icons-vue/es/task--add/32';
import TrashCanIcon from '@carbon/icons-vue/es/trash-can/32';

export interface State {
  items: {
    id: number;
    title: string;
    checked: boolean;
  }[];
  newItemValue: string;
  foundPeople: [];
  selectedPerson: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      items: [
        { id: 4, title: 'Have dinner with Leia Organa', checked: true },
        { id: 1, title: 'Feed Jabba The Hutt', checked: false },
        { id: 5, title: 'Shoot down the Death Star', checked: false },
        { id: 6, title: 'Learn Vue', checked: true },
        { id: 7, title: 'Bribe the officer for the FUI ticket', checked: true },
        {
          id: 8,
          title: 'Retreive Millenium Falcon from Impound',
          checked: false,
        },
      ],
      newItemValue: 'Call @h',
      foundPeople: [],
      selectedPerson: 1,
    };
  },
  mutations: {
    saveFoundPeople(state, people) {
      state.foundPeople = people;
    },
    addListItem(state) {
      if (state.newItemValue != '') {
        const highestId = state.items.length
          ? state.items.reduce((prev, current) => {
              return prev.id > current.id ? prev : current;
            }).id
          : 0;

        state.items = [
          ...state.items,
          {
            id: highestId + 1,
            title: state.newItemValue,
            checked: false,
          },
        ];
      }
    },
    changeNewItemValue(state, newValue) {
      state.newItemValue = newValue;
    },
    resetSelectedPerson(state) {
      state.selectedPerson = 1;
    },
    previousPerson(state) {
      state.selectedPerson--;
      if (state.selectedPerson < 1) {
        state.selectedPerson = state.foundPeople.length;
      }
    },
    nextPerson(state) {
      state.selectedPerson++;
      if (state.selectedPerson > state.foundPeople.length) {
        state.selectedPerson = 1;
      }
    },
    toggleChecked(state, id) {
      const itemIndex = state.items.findIndex((item) => item.id === id);
      state.items[itemIndex].checked = !state.items[itemIndex].checked;
    },
    removeItem(state, id) {
      const itemIndex = state.items.findIndex((item) => item.id === id);
      state.items.splice(itemIndex, 1);
    },
  },
});

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(CarbonIconsVue, {
  components: {
    SquareIcon,
    CheckedSquareIcon,
    AddTask,
    TrashCanIcon,
  },
});
app.mount('#app');
