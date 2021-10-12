import { createApp, InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import App from './App.vue';
import router from './router';

import { CarbonIconsVue } from '@carbon/icons-vue';
import SquareIcon from '@carbon/icons-vue/es/checkbox/32';
import CheckedSquareIcon from '@carbon/icons-vue/es/checkbox--checked/32';

export interface State {
  items: {
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
        { title: 'Feed Jabba The Hutt', checked: false },
        { title: 'Have dinner with Leia Organa', checked: true },
      ],
      newItemValue: '',
    };
  },
  mutations: {
    addListItem(state) {
      console.log(state);
      state.items = [
        ...state.items,
        { title: state.newItemValue, checked: false },
      ];
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
  },
});
app.mount('#app');
