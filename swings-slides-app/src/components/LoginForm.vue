<template>
  <form class="flex flex-col gap-4 w-full max-w-xs mx-auto" @submit.prevent>
    <InputText v-model="email" type="email" placeholder="Email" required/>
    <InputText v-model="password" type="password" placeholder="Password" required />
    <Button label="Sign In" type="submit" class="w-full" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
const password = ref('');
</script>
