<template>
  <q-item
    clickable
    tag="div"
    @click="navigate"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string | { name: string; [key: string]: any };
  icon?: string;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '',
  icon: '',
})

const router = useRouter()

function navigate() {
  if (props.link) {
    if (typeof props.link === 'string') {
      window.open(props.link, '_blank')
    } else {
      router.push(props.link)
    }
  }
}
</script>