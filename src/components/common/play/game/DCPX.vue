<template>
  <div class="game-dcpx">
    <h1>{{word}}</h1>
    <input
      type="text"
      spellcheck="false"
      autocomplete="false"
      v-model="value"
      :class="{ success: isDone && isRight, danger: isDone && !isRight }"
      @keyup.enter="onSubmit"
      autofocus
      ref="inputRef"
    >
  </div>
</template>

<script>
/* eslint-disable */
import { ref, watch, onMounted } from 'vue';

export default {
  props: {
    word: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const value = ref('');
    const inputRef = ref(null);

    watch(value, () => {
      context.emit('change', value.value);
    });

    const onSubmit = () => {
      context.emit('submit', value);
    };

    onMounted(() => {
      inputRef.value.focus();
    });

    return {
      value,
      inputRef,
      onSubmit,
    };
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
  .game-dcpx {
    padding: 20px;
    background-color: grey;
    h1 {
      text-align: center;
    }
    input {
      outline: none;
      width: 125px;
      height: 30px;
      padding: 0 10px;
      border: 0;
      &.success {
        border: 1px solid green;
        color: green;
      }
      &.danger {
        border: 1px solid red;
        color: red;
      }
    }
  }
</style>
