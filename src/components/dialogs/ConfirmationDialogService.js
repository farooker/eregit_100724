import { reactive, ref, toRefs } from 'vue';

const state = reactive({
  isVisible: false,
  title: '',
  message: ''
});

const resolvePromise = ref(null);

function showDialog(title, message) {
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

function confirmDialog() {
  if (resolvePromise.value) {
    resolvePromise.value(true);
    resolvePromise.value = null;
  }
  closeDialog();
}

function cancelDialog() {
  if (resolvePromise.value) {
    resolvePromise.value(false);
    resolvePromise.value = null;
  }
  closeDialog();
}

export function useConfirmationDialog() {
  return {
    ...toRefs(state),
    showDialog,
    confirmDialog,
    cancelDialog
  };
}
