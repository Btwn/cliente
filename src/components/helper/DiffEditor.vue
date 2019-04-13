<template>
  <div
    id="container-monaco"
    style="width:auto;height:600px;border:1px solid grey">
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
export default {
  props: {
    original: { type: String, default: '' },
    modified: { type: String, default: '' }
  },
  data () {
    return {
      diffEditor: null
    }
  },
  mounted () {
    this.diffEditor = monaco.editor.createDiffEditor(
      document.getElementById('container-monaco'),
      { originalEditable: true }
    )
    this.diffEditor.setModel({
      original: monaco.editor.createModel(this.original, 'sql'),
      modified: monaco.editor.createModel(this.modified, 'sql')
    })
  }
}
</script>

<style>

</style>
