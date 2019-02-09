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
              <td>{{ item.nombre.version5000 }}</td>
              <td>{{ item.nombre.version3100 }}</td>
              <td>{{ item.nombre.nombre }}</td>
              <td><v-btn color="success">5000 vs 3100</v-btn></td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <!-- <p>{{ archivos }}</p> -->
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    selected: [],
    archivos: [
      {
        nombre: 'algo'
      },
      {
        nombre: 'algodon'
      }
    ],
    headers: [
      {
        sortable: false,
        text: '5000',
        value: 'id'
      },
      {
        sortable: false,
        text: '3100',
        value: 'id'
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
        this.archivos = resolve.data.map(x => ({ nombre: x }))
        this.archivos = this.archivos.map(item => {
          let version5000 = []
          item.nombre.orig5000 && version5000.push('O')
          item.nombre.repo5000 && version5000.push('R')
          item.nombre.espe5000 && version5000.push('E')
          item.nombre.version5000 = version5000.join('-')

          let version3100 = []
          item.nombre.orig3100 && version3100.push('O')
          item.nombre.repo3100 && version3100.push('R')
          item.nombre.espe3100 && version3100.push('E')
          item.nombre.version3100 = version3100.join('-')

          return item
        })
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
