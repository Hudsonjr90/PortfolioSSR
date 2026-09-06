<template>
  <q-footer
     bordered
    :class="isDark ? 'bg-transparent backdrop-blur' : 'bg-primary'"
  >

    <div class="q-py-lg">
      <div class="wrapper">
        <div class="column items-center q-gutter-sm">
          <div class="text-caption text-center">
            © {{ new Date().getFullYear() }} Hudson Kennedy.
            Todos os direitos reservados.
          </div>

        </div>
      </div>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
const isDark = useTheme().isDark


</script>
