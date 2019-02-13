import * as monaco 	from 'monaco-editor'

    require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

	require(['vs/editor/editor.main'], (dialog, version3100, version5000)=> {
		var diffEditor = monaco.editor.createDiffEditor(document.getElementById(dialog));

		monaco.Promise.join([xhr(version3100), xhr(version5000)]).then(function(r) {
			var originalTxt = r[0].responseText;
			var modifiedTxt = r[1].responseText;

			diffEditor.setModel({
				original: monaco.editor.createModel(originalTxt, 'javascript'),
				modified: monaco.editor.createModel(modifiedTxt, 'javascript'),
			})
		});
	});