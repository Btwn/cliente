<template>
  <v-container
    fluid
    grid-list-xl
    fill-height>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Lista de Archivos"
          text="La lista de Archivos 5000Capacitacion "
        >
          <v-data-table
            :headers="headers"
            :items="archivos"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.version5000 }}</td>
              <td>{{ item.version3100 }}</td>
              <td>{{ item.nombre }}</td>
              <td>
                <v-layout
                  row
                  justify-center>
                  <v-btn
                    color="primary"
                    dark
                    @click="leerArchivo(item.nombre)"
                  >
                    Comparar
                  </v-btn>
                </v-layout>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-if="dialog"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary">
          <v-btn
            icon
            dark
            @click="dialog = false">
            <v-icon>mdi-backspace</v-icon>
          </v-btn>
          <v-toolbar-title>Nombre: {{ nombreArchivo }}</v-toolbar-title>
        </v-toolbar>
        <diff-editor
          :original="mostrarDiff.original"
          :modified="mostrarDiff.modified"
        />
      </v-card>
    </v-dialog>
    <!-- <p>{{ archivos }}</p> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import DiffEditor from '../components/helper/DiffEditor.vue'

export default {
  components:
    {
      DiffEditor
    },
  data: () => ({
    archivos: [],
    dialog: false,
    nombreArchivo: '',
    selected: [],
    editor: null,
    mostrarDiff: {
      original: 'hoolas',
      modified: 'como estas?'
    },
    headers: [
      {
        sortable: false,
        text: '5000',
        value: 'version5000'
      },
      {
        sortable: false,
        text: '3100',
        value: 'version3100'
      },
      {
        sortable: true,
        text: 'Nombre',
        value: 'nombre'
      },
      {
        sortable: false,
        text: 'Comparar'
      }
    ]
  }),
  mounted () {
    axios.get('http://localhost:3333/api/path')
      .then(resolve => {
        this.archivos = resolve.data
        this.archivos = this.archivos.map(item => {
          let version5000 = []
          item.orig5000 && version5000.push('O')
          item.repo5000 && version5000.push('R')
          item.espe5000 && version5000.push('E')
          item.version5000 = version5000.join('-')

          let version3100 = []
          item.orig3100 && version3100.push('O')
          item.repo3100 && version3100.push('R')
          item.espe3100 && version3100.push('E')
          item.version3100 = version3100.join('-')

          return item
        })
      })
      .catch(error => console.log(error))
  },
  methods: {
    async leerArchivo (name) {
      this.dialog = false
      let resolve = await axios.get(`http://localhost:3333/api/file/${name}`)
      this.mostrarDiff.original = await JSON.stringify(resolve.data.orig3100, null, '\t')
      this.mostrarDiff.modified = await JSON.stringify(resolve.data.orig5000, null, '\t')
      this.nombreArchivo = name
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
