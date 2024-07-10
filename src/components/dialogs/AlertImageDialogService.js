import { reactive, ref, toRefs } from 'vue';

const state = reactive({
  isVisible: false,
  title: '',
  message: ''
});

const resolvePromise = ref(null);

function showAlertImage(title, message) {
  state.title = title;
  state.message = message;
  state.isVisible = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

function closeDialog() {
  state.isVisible = false;
}

function confirmImageDialog() {
  if (resolvePromise.value) {
    resolvePromise.value(true);
    resolvePromise.value = null;
  }
  closeDialog();
}


export function useAlertImageDialog() {
  return {
    ...toRefs(state),
    showAlertImage,
    confirmImageDialog,
  };
}
