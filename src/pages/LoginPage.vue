<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="username"
          label="Usuário"
          outlined
          class="q-mb-md"
        />
        <q-input
          v-model="password"
          label="Senha"
          type="password"
          outlined
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Login"
          color="primary"
          @click="handleLogin"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/AuthStore';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  try {
    await authStore.login(username.value, password.value);

    const targetRoute = authStore.isAdmin ? '/adm' : '/home';
    router.push(targetRoute); 
  } catch (error) {
    console.error("Falha no login:", error);
  }
}


</script>
