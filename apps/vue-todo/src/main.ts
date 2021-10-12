import { createApp, InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import App from './App.vue';
import router from './router';

import { CarbonIconsVue } from '@carbon/icons-vue';
import SquareIcon from '@carbon/icons-vue/es/checkbox/32';
import CheckedSquareIcon from '@carbon/icons-vue/es/checkbox--checked/32';
import AddTask from '@carbon/icons-vue/es/task--add/32';

export interface State {
  items: {
    id: number;
    title: string;
    checked: boolean;
  }[];
  newItemValue: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      items: [
        { id: 1, title: 'Feed Jabba The Hutt', checked: false },
        { id: 2, title: 'Have dinner with Leia Organa', checked: true },
      ],
      newItemValue: 'Shoot down the Death Star',
    };
  },
  mutations: {
    addListItem(state) {
      if (state.newItemValue != '') {
        state.items = [
          ...state.items,
          { id: 9, title: state.newItemValue, checked: false },
        ];
      }
    },
    changeNewItemValue(state, newValue) {
      state.newItemValue = newValue;
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
  },
});
app.mount('#app');
