<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Intelisis MG
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Buscar..."
            color="purple"
          />
        </v-list-tile>
        <v-list-group
          :value="true"
          prepend-icon="mdi-baby-buggy"
          class="v-list-item"
        >
          <v-list-tile
            slot="activator"
            class="v-list-item"
          >
            <v-list-tile-title>Migracion</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(link, i) in linksMG"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />
          </v-list-tile>
        </v-list-group>
        <v-list-group
          :value="false"
          prepend-icon="mdi-auto-fix"
          class="v-list-item"
        >
          <v-list-tile
            slot="activator"
            class="v-list-item"
          >
            <v-list-tile-title>Reparación</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(link, i) in toolsMG"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />
          </v-list-tile>
        </v-list-group>
        <v-list-group
          :value="false"
          prepend-icon="mdi-ambulance"
          class="v-list-item"
        >
          <v-list-tile
            slot="activator"
            class="v-list-item"
          >
            <v-list-tile-title>Ejemplos</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          disabled
          active-class="primary"
          class="v-list-item v-list__tile--buy"
          to="/upgrade"
        >
          <v-list-tile-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="font-weight-light">
            Upgrade To PRO
          </v-list-tile-title>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    logo: './img/vuetifylogo.png',
    links: [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile'
      },
      {
        to: '/table-list',
        icon: 'mdi-clipboard-outline',
        text: 'Table List'
      },
      {
        to: '/typography',
        icon: 'mdi-format-font',
        text: 'Typography'
      },
      {
        to: '/icons',
        icon: 'mdi-chart-bubble',
        text: 'Icons'
      },
      {
        to: '/maps',
        icon: 'mdi-map-marker',
        text: 'Maps'
      },
      {
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notifications'
      }
    ],
    linksMG: [
      {
        to: '/listaArchivos',
        icon: 'mdi-anvil',
        text: 'Lista Archivos'
      },
      {
        to: '/listaSql',
        icon: 'mdi-altimeter',
        text: 'Lista SQL'
      },
      {
        to: '/listaEspeciales',
        icon: 'mdi-altimeter',
        text: 'Lista Especiales'
      },
      {
        to: '/acceso',
        icon: 'mdi-account',
        text: 'Acceso'
      },
      {
        to: '/relacion',
        icon: 'mdi-account-group',
        text: 'Relacion de objetos'
      }
    ],
    toolsMG: [
      {
        to: '/codificar',
        icon: 'mdi-anchor',
        text: 'Una sola codificacion'
      },
      {
        to: '/especialesFix',
        icon: 'mdi-arrow-decision',
        text: 'Arreglar especiales'
      },
      {
        to: '/ventanaTipoMarco',
        icon: 'mdi-application',
        text: 'Arreglar los marcos'
      },
      {
        to: '/fondoNegro',
        icon: 'mdi-alert-circle',
        text: 'Arreglar fondo negro'
      },
      {
        to: '/menuPrincipal',
        icon: 'mdi-auto-fix',
        text: 'Re-acomodar Menu'
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
