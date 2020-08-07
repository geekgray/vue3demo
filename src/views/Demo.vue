<template>
  <div>
    composition-api
    <van-play
      v-if="scene === 1"
      :data="quizzes"
      :validation="validation"
      @before-next="onBeforeNext"
      @finished="onFinished"
    />
    <h1 v-else>
      <p>Game Finished!!</p>
      <button @click="scene = 1">replay</button>
      <ul class="results">
        <li
          v-for="result in results" :key="result.key"
          :class="{ success: result.isRight, danger: !result.isRight }"
        >
          {{result.key}} {{result.userAnswer}}
        </li>
      </ul>
    </h1>
  </div>
</template>

<script>
/* eslint-disable */
import VanPlay from '../components/common/play';

export default {
  name: 'Demo',
  components: {
    VanPlay,
  },
  data() {
    return {
      scene: 1,
      quizzes: [
        {
          id: 1,
          word: 'banana',
        },
        {
          id: 2,
          word: 'apple',
        },
        {
          id: 3,
          word: 'orange',
        },
        // {
        //   id: 4,
        //   word: 'tiger',
        // },
        // {
        //   id: 5,
        //   word: 'cat',
        // },
        // {
        //   id: 6,
        //   word: 'dog',
        // },
        // {
        //   id: 7,
        //   word: 'elephant',
        // },
        // {
        //   id: 8,
        //   word: 'bird',
        // },
        // {
        //   id: 9,
        //   word: 'fly',
        // },
        // {
        //   id: 10,
        //   word: 'plane',
        // },
      ],
      results: [],
    };
  },
  methods: {
    onFinished(results) {
      this.scene = 2;
      this.results = results;
      console.log('results', results);
    },
    onBeforeNext({ isRight, current, index }, insertAction) {
      if (!isRight) {
        insertAction(index + 2, current);
      }
    },
    validation(current, userAnswer) {
      if (current.word === 'banana') {
        return userAnswer === '123';
      }
      return current.word === userAnswer;
    },
  },
};
</script>

<style lang="scss" scoped>
  .results {
    width: 300px;
    list-style: none;
    font-size: 16px;
    margin: 30px auto;
    border-radius: 10px;
    box-shadow: 1px 1px 5px grey;
    padding: 20px;
    li {
      text-align: left;
    }
    .success {
      color: green;
    }
    .danger {
      color: red;
    }
  }
</style>
