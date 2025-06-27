<template>
  <form class="flex flex-col gap-4 w-full max-w-xs mx-auto" @submit.prevent="handleSubmit">
    <InputText v-model="email" type="email" placeholder="Email" required />
    <InputText v-model="password" type="password" placeholder="Password" required />
    <Button label="Sign In" type="submit" class="w-full" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref<string>('');
const password = ref<string>('');

const emit = defineEmits<{
  (e: 'submit', value: { email: string; password: string }): void;
}>();

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value });
}
</script>

