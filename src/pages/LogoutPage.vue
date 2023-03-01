<template lang="pug">
q-page(class="bg-blue text-white text-center q-pa-md flex flex-center")
  div
    div(style="font-size: 20vh") Bye-bye...
</template>

<style>
</style>

<script>
import {onMounted} from 'vue'
import {authStore} from 'src/stores/auth'

export default ({
  setup() {
    const auth = authStore()

    onMounted(() =>
      auth.logout()
    )
    return {}
  }
})

</script>

<style>
.q-card {
  width: 360px;
}
</style>
