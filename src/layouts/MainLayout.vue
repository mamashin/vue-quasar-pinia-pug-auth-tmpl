<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer")
      //q-toolbar-title Тут будет ПРБ !
      q-btn-dropdown(stretch flat label="Настройки" v-if="auth.isLoggedIn")
        q-list
          //q-item-label(header) Folders
          q-item(v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0" to="/login")
            q-item-section(avatar)
              q-avatar(icon="image" color="secondary" text-color="white" size="md")
            q-item-section
              q-item-label {{ n }} Photos
              q-item-label(caption) Description
      q-space
      div(v-if="auth.isLoggedIn")
        q-btn(dense color="gray"  icon="people" class="q-ml-md")
          q-badge(color="teal" floating) 0
        q-btn(dense color="gray" round icon="subject" class="q-ml-md")
          q-badge(color="teal" floating) 0
      q-separator(dark vertical spaced)
      div
        q-btn(flat dense icon="manage_accounts" to="/" size="md" v-if="auth.isLoggedIn")
        q-btn(flat dense icon="exit_to_app" to="/logout" size="md" v-if="auth.isLoggedIn")
          q-tooltip  Выход
        q-btn(flat dense icon="login" to="/login" size="md" v-if="!auth.isLoggedIn")
          q-tooltip Вход
  q-drawer(v-model="leftDrawerOpen" show-if-above bordered)
    q-list
      q-item-label(header) Что тут есть hello
      EssentialLink(v-for="link in essentialLinks" :key="link.title" v-bind="link")

  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from 'vue'
import { authStore } from 'src/stores/auth'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Login',
    caption: 'login',
    icon: 'login',
    link: '/login'
  },
  {
    title: 'Logout',
    caption: 'logout',
    icon: 'exit_to_app',
    link: '/logout'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const auth = authStore()
    return {
      essentialLinks: linksList,
      auth,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
