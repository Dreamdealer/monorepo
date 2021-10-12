<template>
  <div class="home">
    <img
      alt="Star Wars Logo"
      src="https://media.s-bol.com/qQx5MY9Bg75G/550x278.jpg"
      height="120"
    />
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
