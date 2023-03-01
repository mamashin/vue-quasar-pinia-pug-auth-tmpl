<template lang="pug">
q-page(class="flex flex-center")
  q-card
    q-card-section
      q-avatar(size="80px" class="absolute-center shadow-10" icon="face" color="primary" v-if="!bad_auth")
      q-avatar(size="80px" class="absolute-center shadow-10" icon="sentiment_dissatisfied" color="negative" v-if="bad_auth")
    q-card-section
      div(class="text-center q-pt-md")
        div(class="col text-h6 ellipsis" v-if="!bad_auth") Авторизация
        div(class="col text-h6 ellipsis" v-if="bad_auth") Ошибка авторизации
    q-card-section
      q-form(class="q-gutter-md" @submit="onSubmit")
        q-input(lazy-rules v-model="form.username" label="Имя пользователя")
        q-input(lazy-rules v-model="form.password" type="password" label="Пароль")
        q-card-actions(class="q-pa-none")
          q-btn(unelevated color="primary" size="lg" class="full-width" label="вход" type="submit")
</template>

<style>
</style>

<script>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from 'src/stores/auth'

export default ({
  setup ()
  {
    const auth = authStore()
    const router = useRouter()
    const bad_auth = ref(false)
    const form = reactive({username: '', password: ''})

    async function onSubmit (mode, input) {
      const data = await auth.login(form)
      if (data.status === 200 ) { await router.push('/') }
      else {
        bad_auth.value = true
      }
    }
    return { form, onSubmit, bad_auth }
    }
  })

</script>

<style>
.q-card {
  width: 360px;
}
</style>
