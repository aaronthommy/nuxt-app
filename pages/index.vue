<template>
  <component :is="currentConfigurator" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCylinderStore } from '@/stores/cylinderStores.js'
import ConfiguratorView from '@/components/ConfiguratorView.vue'
import ConfiguratorViewM from '@/components/ConfiguratorViewM.vue'

const route = useRoute()
const store = useCylinderStore()

// Setze das Modell aus der URL, falls vorhanden
onMounted(() => {
  const modelQuery = route.query.model
  if (modelQuery && typeof modelQuery === 'string') {
    store.setModel(modelQuery)
  }
})

// Nutze einen Fallback-Wert, falls window nicht definiert ist (z. B. 1024)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const updateWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

// Bestimme, ob es sich um eine mobile Ansicht handelt
const isMobile = computed(() => windowWidth.value < 1200)

// Dynamischer Component Loader: Wenn mobil, verwende ConfiguratorViewM, ansonsten ConfiguratorView
const currentConfigurator = computed(() =>
  isMobile.value ? ConfiguratorViewM : ConfiguratorView
)
</script>
