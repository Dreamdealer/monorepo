<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" height="50" />
    <TodoList title="What to do, Luke?" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TodoList from '../components/TodoList.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TodoList,
  },
});
</script>
