import { reactive, ref, toRefs } from 'vue';

const state = reactive({
  isVisible: false,
  title: '',
  message: ''
});

const resolvePromise = ref(null);

function  showValidDialog(title,message) {
  state.title = title;
  state.message = message;
  state.isVisible = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}
function confirmDialog() {
  state.isVisible = false;
}
export function useValidDialog() {
  return {
    ...toRefs(state),
    showValidDialog,
    confirmDialog
  };
}
