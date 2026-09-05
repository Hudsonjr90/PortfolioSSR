<script setup lang="ts">
const { data: portfolio } = usePortfolio()

const principles = [
  {
    title: 'Arquitetura & Escalabilidade',
    description:
      'Estruturo soluções pensando em crescimento, manutenção e evolução contínua do produto.',
    icon: 'mdi-layers-outline',
  },
  {
    title: 'Performance & Qualidade',
    description:
      'Busco código eficiente, consultas otimizadas e experiências rápidas e consistentes.',
    icon: 'mdi-speedometer',
  },
  {
    title: 'Segurança & Boas Práticas',
    description:
      'Aplico princípios de segurança, organização e padrões que tornam o software mais confiável.',
    icon: 'mdi-shield-check-outline',
  },
]
</script>

<template>
  <section
    id="sobre"
    class="q-py-xl"
  >
    <div class="wrapper">
      <div class="row items-center q-col-gutter-xl">

        <div class="col-12 col-md-7">
          <div class="text-overline text-primary">
            Sobre mim
          </div>

          <div class="text-h3 text-weight-bold q-mb-lg">
            Experiência que gera resultado
          </div>

          <div class="text-body1">
            {{ portfolio?.profile?.about }}
          </div>
        </div>

        <div class="col-12 col-md-5">
          <div class="text-overline text-primary">
            Como eu trabalho
          </div>

          <div class="text-h5 text-weight-bold q-mb-md">
            Engenharia com propósito
          </div>

          <div class="column q-gutter-md">
            <q-card
              v-for="principle in principles"
              :key="principle.title"
              flat
              bordered
              class="bg-primary"
            >
              <q-card-section class="row items-center no-wrap q-gutter-md">

                <q-avatar
                  color="primary"
                  text-color="white"
                  size="52px"
                >
                  <q-icon
                    :name="principle.icon"
                    size="28px"
                  />
                </q-avatar>

                <div class="col">
                  <div class="text-subtitle1 text-weight-bold">
                    {{ principle.title }}
                  </div>

                  <div class="text-body2 q-mt-xs">
                    {{ principle.description }}
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>