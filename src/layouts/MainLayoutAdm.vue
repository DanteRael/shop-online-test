<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-navbar text-navbar">
        <q-bar class="bg-searchbar text-searchbar" style="height: 80px; width: 100%;">
        <q-btn flat icon="home" aria-label="Logo" />
        <q-input
      model-value=""
      outlined
      square
      placeholder="Buscar produtos"
      class="q-ml-md q-mr-md bg-search text-search"
      style="flex: 1;"
    >
      <template #append>
        <q-btn flat icon="search" />
      </template>
    </q-input>
  
        <q-btn
          flat
          icon="account_circle"
          :label="isAuthenticated ? 'Logout' : 'Login'"
          class="q-mr-sm"
          @click="handleAuthClick"
        />

        <q-btn flat icon="shopping_cart" label="Carrinho" />
      </q-bar>
  
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
  
          <q-toolbar-title>
            Shop online
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label
            header
          >
            Essential Links
          </q-item-label>
  
          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

  const router = useRouter();
  const isAuthenticated = ref<boolean>(false);
  
  const linksList: EssentialLinkProps[] = [
  {
    title: 'Criar um novo produto',
    icon: 'add_circle',
    link: { name: 'create-products' },
  },
  {
    title: 'Atualizar um produto existente',
    icon: 'edit',
    link: { name: 'update-products' },
  },
  {
    title: 'Remover um produto',
    icon: 'delete',
    link: { name: 'delete-products' },
  },
]


  
  const leftDrawerOpen = ref(false);
  
  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

function handleAuthClick() {
  if (isAuthenticated.value) {
    logout();
  } else {
    router.push('/login');
  }
}

function logout() {
  console.log('Logging out...');
  isAuthenticated.value = false;

  router.push('/login');
}

function simulateLogin() {
  isAuthenticated.value = true;
}

simulateLogin();
  </script>
  
  <style>
  .bg-searchbar {
    background-color: #131921 !important;
  }
  .text-searchbar {
    color: #FFFFFF !important;
  }
  
  .bg-navbar {
    background-color: #232F3E !important; 
  }
  .text-navbar {
    color: #FFFFFF !important;
  }
  
  .bg-search {
    background-color: #FFFFFF !important; 
  }
  .text-search {
    color: #000000 !important;
  }
  </style>