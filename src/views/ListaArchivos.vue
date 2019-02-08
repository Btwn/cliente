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
              <td>{{ item.id }}</td>
              <td>{{ item.nombre }}</td>
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
    pagination: {
      sortBy: 'nombre'
    },
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
        text: 'ID',
        value: 'id'
      },
      {
        sortable: true,
        text: 'Nombre',
        value: 'nombre'
      }
    ]
  }),
  mounted () {
    axios.get('http://localhost:3333/api/files')
      .then(response => {
        this.archivos = response.data.filter((x, k) => k <= 20).map(x => ({ nombre: x }))
        console.log(this.archivos)
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
