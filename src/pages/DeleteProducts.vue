<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6">Excluir Produto</div>
        </q-card-section>
        
        <q-card-section>
          <q-form @submit.prevent="deleteProduct">
            <q-input 
              v-model="productId" 
              label="ID do Produto para Exclusão" 
              type="number"
              required 
            />
            
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="negative" @click="goToAdmHome" />
              <q-btn 
                label="Excluir Produto" 
                type="submit" 
                color="negative"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const goToAdmHome = () => {
  router.push({ name: 'adm-home' })
}
  
  /* eslint-disable @typescript-eslint/no-unused-vars */
  
  const $q = useQuasar()
  const router = useRouter()
  
  const productId = ref<number | null>(null)
  
  const deleteProduct = async () => {
    if (!productId.value) {
      $q.notify({
        type: 'negative',
        message: 'Por favor, insira um ID de produto válido'
      })
      return
    }
  
    try {
      const { data } = await axios.delete(`/api/products/${productId.value}`)
      
      $q.notify({
        type: 'positive',
        message: 'Produto excluído com sucesso!'
      })
      
      router.push('/products')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erro ao excluir produto'
      
      $q.notify({
        type: 'negative',
        message: errorMessage
      })
    }
  }
  </script>
  
  <style scoped>
  .q-input {
    margin-bottom: 16px;
  }
  </style>