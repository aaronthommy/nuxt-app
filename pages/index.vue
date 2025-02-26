<template>
   
    <ConfiguratorView/>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCylinderStore } from '@/stores/cylinderStores.js' 
  
  const route = useRoute()
  const store = useCylinderStore()
  
  onMounted(() => {
    const modelQuery = route.query.model
    if (modelQuery && typeof modelQuery === 'string') {
      store.setModel(modelQuery)
    }
  })
  </script>
  