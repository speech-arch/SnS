<template>
  <form class="flex flex-col gap-4 w-full max-w-xs mx-auto">
    <InputText v-model="email" type="email" placeholder="Email" required />
    <InputText v-model="password" type="password" placeholder="Password" required />
    <InputText v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
    <div class="flex items-center gap-2">
      <Checkbox v-model="acceptTerms" inputId="acceptTerms" :binary="true" required />
      <label for="acceptTerms" class="text-sm select-none">I accept the <a href="#" class="text-primary underline">terms and conditions</a></label>
    </div>
    <Button label="Sign Up" type="submit" class="w-full" :disabled="!acceptTerms" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
</script>
