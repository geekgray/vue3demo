<template>
  <div class="practice">
    <p>index: {{index}}</p>
    <p>isRight: {{isRight}}</p>
    <p>userAnswer: {{userAnswer}}</p>
    <p>isDone: {{isDone}}</p>
    <p>isFinished: {{isFinished}}</p>
    <van-game-dcpx
      :key="index"
      :word="current.word"
      :is-done="isDone"
      :is-right="isRight"
      @change="onChange"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, ref } from 'vue';
import { useAnswerControl, useDoneControl, useFlowControl } from '@/components/common/play';
import VanGameDcpx from '@/components/common/play/game/DCPX';

export default {
  name: 'Play',
  components: {
    VanGameDcpx,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    validation: {
      type: Function,
    },
  },
  methods: {
    onChange(e) {
      if (Object.prototype.toString.call(e) === '[object Event]') {
        return;
      }
      this.setAnswer(e);
    },
    onSubmit() {
      this.setDone(this.index);

      if (!this.isDone) {
        this.nextAction();
      }
    },
  },
  setup(props, context) {
    const { isDone, setDone } = useDoneControl();
    const { next: nextAction, insert: insertAction } = useFlowControl(props.data, {
      onBeforeNext(current, currentIndex, data) {
        context.emit('before-next', {
          isRight: isRight.value,
          current: current,
          index: currentIndex,
          data,
        }, insertAction);
      },
      onFinished() {
        context.emit('finished', results);
      },
    });

    const nextResult = nextAction();
    const current = reactive(nextResult.value);
    const index = ref(nextResult.index);
    const isFinished = ref(nextResult.done);

    const { isRight, userAnswer, setAnswer, results } = useAnswerControl(current, index, props.validation);

    return {
      current,
      index,
      userAnswer,
      isRight,
      isDone,
      isFinished,
      setDone,
      setAnswer,
      nextAction,
      insertAction,
    };
  },
};
</script>

<style lang="scss" scoped>
  .practice {
    width: 600px;
    margin: 0 auto;
    background-color: yellowgreen;
  }
</style>
