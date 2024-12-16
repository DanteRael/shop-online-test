<template>
  <q-page class="flex flex-center bg-purple-1">
    <q-card square bordered class="q-pa-lg shadow-1" style="width: 350px">
      <q-card-section>
        <div class="text-center q-mb-lg">
          <div class="text-h5 text-weight-bold text-purple-8">Login</div>
        </div>

        <q-form @submit.prevent="login" class="q-gutter-md">
          <q-input 
            outlined 
            v-model="form.user" 
            label="Usuário" 
            color="purple-12"
            dense
            class="q-mb-md"
            hide-bottom-space
            :rules="[val => !!val || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input 
            outlined 
            type="password"
            v-model="form.password" 
            label="Senha" 
            color="purple-12"
            dense
            class="q-mb-md"
            hide-bottom-space
            :rules="[val => !!val || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <div class="full-width q-mt-md">
            <q-btn 
              unelevated 
              color="purple-8" 
              text-color="white" 
              label="Entrar" 
              type="submit" 
              class="full-width"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '../stores/AuthStore'
import { notify } from 'src/utils/notify-utils';
import { useRoute, useRouter } from 'vue-router';

const form = reactive({ user: '', password: ''})

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

/* eslint-disable @typescript-eslint/no-explicit-any */
const login = async () => {
  try {
    await auth.login(form.user, form.password)
    await router.push(route.query.redirect?.toString() ?? '/')
  } catch (e: any) {
    notify.error(e.response?.data?.message)
  }
}
</script>