<template lang="pug">
div(class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center")
  div
    div(style="font-size: 30vh") 404
    div(class="text-h2" style="opacity:.6") Oops. Nothing here...
    q-btn(class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps)
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
