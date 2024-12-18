<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6">Atualizar Produto</div>
        </q-card-section>
        
        <q-card-section>
          <q-form @submit.prevent="updateProduct">
            <q-input 
              v-model="productId" 
              label="ID do Produto" 
              type="number"
              required 
              @blur="fetchProductDetails"
            />
  
            <template v-if="productLoaded">
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
            </template>
            
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="negative" @click="goToAdmHome" />
              <q-btn 
                label="Atualizar Produto" 
                type="submit" 
                color="primary" 
                :disable="!productLoaded"
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
  const productLoaded = ref(false)
  
  const productData = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  })
  
  const categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Outros']
  
  const fetchProductDetails = async () => {
    if (!productId.value) return
  
    try {
      const { data } = await axios.get(`/api/products/${productId.value}`)
      
      productData.value = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category
      }
      
      productLoaded.value = true
      
      $q.notify({
        type: 'positive',
        message: 'Detalhes do produto carregados com sucesso!'
      })
    } catch (err: unknown) {
      productLoaded.value = false
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erro ao carregar detalhes do produto'
      
      $q.notify({
        type: 'negative',
        message: errorMessage
      })
    }
  }
  
  const updateProduct = async () => {
    if (!productId.value) return
  
    try {
      const { data } = await axios.put(`/api/products/${productId.value}`, {
        ...productData.value,
        id: productId.value
      })
      
      $q.notify({
        type: 'positive',
        message: 'Produto atualizado com sucesso!'
      })
      
      router.push('/products')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erro ao atualizar produto'
      
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