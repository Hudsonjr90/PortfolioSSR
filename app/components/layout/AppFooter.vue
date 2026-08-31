<template>
  <q-footer
    class="bg-primary text-white"
  >
    <!-- Wave superior
    <svg
      class="wave"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C240,110 480,110 720,64 C960,18 1200,18 1440,64 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg> -->

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
