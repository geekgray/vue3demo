import { computed, reactive, ref, watch } from 'vue';

export function useAnswerControl(current, index, validation) {
  const results = reactive([]);
  const key = computed(() => `${current.value.id}_${index.value}`);

  const currentResult = computed(() => {
    const [result] = results.filter(item => item.key === key.value);
    return result;
  });

  const userAnswer = computed(() => currentResult.value ? currentResult.value.userAnswer : '');

  const isRight = computed(() => validation ? validation(current.value, userAnswer.value) : false);

  const setAnswer = (answer) => {
    if (currentResult.value) {
      currentResult.value.userAnswer = answer;
      currentResult.value.isRight = isRight.value;
    } else {
      results.push({
        id: current.value.id,
        isRight: false,
        userAnswer: '',
        key: key.value,
      });
    }
  };

  return {
    userAnswer,
    isRight,
    results,
    setAnswer,
  };
}

export function useDoneControl() {
  const recordArr = reactive([]);

  const isDone = computed(() => {
    const [first, second] = recordArr;
    return first !== second;
  });

  const setDone = (index) => {
    recordArr.splice(0, 0, index);
  };

  return {
    isDone,
    setDone,
  };
}

export function useFlowControl(data, { onChange, onFinished, onBeforeNext } = {}) {
  const newData = ref(data);

  const nextIndex = ref(0);
  const currentIndex = computed(() => nextIndex.value - 1);
  const done = computed(() => nextIndex.value >= newData.value.length);
  const current = computed(() => newData.value[currentIndex.value]);

  watch(nextIndex, () => {
    onChange && onChange(nextIndex.value);
  });

  const next = () => {
    if (nextIndex.value) {
      const currentIndex = nextIndex.value - 1;
      onBeforeNext && onBeforeNext(current.value, currentIndex, newData.value);
    }

    if (done.value) {
      onFinished && onFinished();
      return;
    }

    nextIndex.value += 1;

    return {
      done,
      value: current,
      index: currentIndex,
    };
  };

  const insert = (index, item) => {
    if (index <= nextIndex.value) {
      console.warn('You can only insert backwards.');
      return;
    }
    newData.value.splice(index, 0, item);
  };

  return {
    next,
    insert,
  };
}
