<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6">Criar Novo Produto</div>
        </q-card-section>
        
        <q-card-section>
          <q-form @submit.prevent="createProduct">
            <q-input 
              v-model="productData.name" 
              label="Nome do Produto" 
              required 
            />
            <q-input 
              v-model="productData.description" 
              label="Descrição" 
              required 
            />
            <q-input 
              v-model.number="productData.price" 
              type="number" 
              label="Preço" 
              required 
            />
            <q-input 
              v-model.number="productData.stock" 
              type="number" 
              label="Estoque" 
              required 
            />
            <q-select 
              v-model="productData.category" 
              :options="categories" 
              label="Categoria" 
              required 
            />
            
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="negative" @click="goToAdmHome" />
              <q-btn label="Criar Produto" type="submit" color="primary" />
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
  
  // Disable eslint for unused vars in this specific case
  /* eslint-disable @typescript-eslint/no-unused-vars */
  
  const $q = useQuasar()
  const router = useRouter()
  
  const productData = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  })
  
  const categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Outros']
  
  const createProduct = async () => {
    try {
      // Explicitly declare the type for the response
      const { data } = await axios.post('/api/products', productData.value)
      
      // Show success notification
      $q.notify({
        type: 'positive',
        message: 'Produto criado com sucesso!'
      })
      
      // Redirect to products list or clear form
      router.push('/products')
    } catch (err: unknown) {
      // Proper error handling
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erro desconhecido ao criar produto'
      
      $q.notify({
        type: 'negative',
        message: errorMessage
      })
    }
  }
  </script>
  
  <style scoped>
  .q-input, .q-select {
    margin-bottom: 16px;
  }
  </style>