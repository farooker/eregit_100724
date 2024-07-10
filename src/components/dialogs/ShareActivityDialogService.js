import RspService from "@/apis/RspService";
import { reactive, ref, toRefs } from "vue";

const state = reactive({
  isVisible: false,
  email: null,
  bp_number: null,
  is_err: false,
});

const resolvePromise = ref(null);

function showShareActivityDialog(bp_number) {
  state.email = null;
  state.bp_number = bp_number;
  state.is_err = false;
  state.isVisible = true;

  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
}

async function showShareActivity() {
  try {
    state.is_err = false;
    const response = await RspService.shareRspActivity(
      state.bp_number,
      state.email
    );
    if (response.data && response.data.is_success) {
      state.is_err = false;
      return true;
    }
    state.is_err = true;
    return false;
  } catch (error) {
    state.is_err = true;
    return false;
  }
}

function closeShareActivityDialog() {
  state.isVisible = false;
  state.is_err = false;
}

async function confirmShareActivityDialog() {
  if (await showShareActivity()) {
    if (resolvePromise.value) {
      resolvePromise.value({ email: state.email, is_confirm: true });
      resolvePromise.value = null;
    }
    closeShareActivityDialog();
  }
}

function cancelShareActivityDialog() {
  if (resolvePromise.value) {
    resolvePromise.value({ email: state.email, is_confirm: false });
    resolvePromise.value = null;
  }
  closeShareActivityDialog();
}

export function useShareActivityDialog() {
  return {
    ...toRefs(state),
    showShareActivityDialog,
    confirmShareActivityDialog,
    cancelShareActivityDialog,
  };
}
