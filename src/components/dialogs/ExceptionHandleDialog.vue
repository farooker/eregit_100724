<template>
    <v-snackbar
     v-model="isVisible"
      :timeout="2000"
      color="secondary"
      elevation="21"
    >
     <strong>{{title}}</strong>
     <br/>
     <p> {{message}}</p>
    </v-snackbar>
</template>
<script setup>
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

  const { isVisible, title, message} = useErrorHandlingDialog();
</script>
