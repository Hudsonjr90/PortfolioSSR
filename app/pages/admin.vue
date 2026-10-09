<template>
  <q-layout view="hHh lpR fFf">
    <AppNavbar />
    <q-page-container class="q-mb-md container-style" style="padding-top: 30px">
      <q-page style="min-height: calc(100vh - 30px)">
        <AdminDashboard />
      </q-page>
    </q-page-container>
    <AppFooter />
    <ScrollToTop />
  </q-layout>
</template>

<script setup lang="ts">
import AdminDashboard from '~/components/pages/admin/AdminDashboard.vue'
</script>

<style scoped>
.container-style {
  position: relative;
  min-height: 100vh;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.18) 1.3px, transparent 1.3px);
  background-size: 42px 42px;
}
</style>
