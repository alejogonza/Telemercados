<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-8 text-white">
        <q-space />
        <q-tabs shrink>
          <q-tab name="tab1" icon="logout" @click="logout" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
