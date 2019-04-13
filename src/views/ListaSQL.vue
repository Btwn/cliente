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
          title="Lista de SQL"
          text="La lista de Objetos SQL "
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
              <td>
                <v-layout
                  row
                  justify-center>
                  <v-btn
                    color="success"
                    dark
                    @click="leerArchivo(item)"
                  >
                    {{ item }}
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
import { constants } from 'fs';

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
      original: '',
      modified: ''
    },
    headers: [
      {
        sortable: false,
        text: 'Comparar'
      }
    ],
    comparar: 'Comparar'
  }),
  mounted () {
    axios.get('http://127.0.0.1:3333/api/sql')
      .then(resolve => {
        this.archivos = resolve.data
        console.log(this.archivos)
      })
      .catch(error => console.log(error))
  },
  methods: {
    async leerArchivo (name) {
      this.dialog = false
      let resolve = await axios.get(`http://localhost:3333/api/sql/${name}`)
      this.mostrarDiff.original = await resolve.data.orig3100
      this.mostrarDiff.modified = await resolve.data.orig5000
      this.nombreArchivo = name
      this.dialog = true
    },
    async checkArchivo (item) {
      let resolve = await axios.get(`http://localhost:3333/api/file/${item.nombre}`)
      console.log( resolve.data.diffOriginal )
      let dife = resolve.data.diffOriginal ? 'igual' : 'diferente'
      this.archivos = this.archivos.map(x => {
        if(item.nombre === x.nombre){
          x.diff = dife
        }
        return x
      })

    }
  }
}
</script>

<style>

</style>
