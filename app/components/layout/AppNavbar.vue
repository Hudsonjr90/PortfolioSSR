<template>
  <q-header
    elevated
    class="bg-dark wrapper backdrop-blur"
  >
    <q-toolbar class="q-px-lg">

      <q-toolbar-title>
        <q-btn
          flat
          no-caps
          label="Hudson Kennedy"
          href="#home"
          class="text-white"
        />
      </q-toolbar-title>

      <div class="row items-center q-gutter-sm gt-sm">
        <q-btn
          flat
          no-caps
          label="Sobre"
          href="#about"
          text-color="grey-3"
        />

        <q-btn
          flat
          no-caps
          label="Experiência"
          href="#experience"
          text-color="grey-3"
        />

        <q-btn
          flat
          no-caps
          label="Tecnologias"
          href="#technologies"
          text-color="grey-3"
        />

        <q-btn
          flat
          no-caps
          label="Formação"
          href="#education"
          text-color="grey-3"
        />

        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Contato"
          href="#contact"
        />
      </div>

      <q-btn
        flat
        round
        dense
        icon="menu"
        class="lt-md"
        color="white"
        aria-label="Abrir menu"
      >
        <q-menu>
          <q-list style="min-width: 200px">
            <q-item
              v-close-popup
              clickable
              tag="a"
              href="#about"
            >
              <q-item-section>
                Sobre
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              tag="a"
              href="#experience"
            >
              <q-item-section>
                Experiência
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              tag="a"
              href="#technologies"
            >
              <q-item-section>
                Tecnologias
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              tag="a"
              href="#education"
            >
              <q-item-section>
                Formação
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              tag="a"
              href="#contact"
            >
              <q-item-section>
                Contato
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-toolbar>
  </q-header>
</template>