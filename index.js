const prompts = require('prompts');
const fse = require('fs-extra');
const replaceInFile = require('replace-in-file');

var command  = (process.argv.length > 2 ? process.argv[2] : '').toLowerCase();

if (command === 'new') {
  console.log('Creating new project');

  const questions = [{
      type: 'text',
      name: 'newComponentTag',
      message: 'What is the tag name of the new component (e.g., rise-text)?',
      initial: 'rise-example-component'
    }, {
      type: 'text',
      name: 'displayIdStable',
      message: 'What is the Display ID for Staging e2e tests?',
      initial: 'RYARGCAQHWQ3'
    }, {
      type: 'text',
      name: 'displayIdBeta',
      message: 'What is the Display ID for Beta e2e tests?',
      initial: '3KDV24T9TGEX'
    }
  ];

  (async () => {
    const { newComponentTag, displayIdStable, displayIdBeta } = await prompts(questions);

    if (!newComponentTag || !displayIdStable || !displayIdBeta) {
      console.log('All the fields are required');
      return -1;
    }

    const newComponentName = _tagToTitleCase(newComponentTag, ' ');
    const newComponentClass = _tagToTitleCase(newComponentTag, '');
    const sourceDir = process.cwd() + '/template';
    const destinationDir = process.cwd() + '/build/' + newComponentTag;

    // Clear directory and start over with template files
    await fse.emptyDir(destinationDir);
    await fse.copy(sourceDir, destinationDir);

    // Rename files using tag name
    const filesToRename = [
      'demo/src/new-component-tag.html',
      'demo/src/new-component-tag-dev.html',
      'e2e/new-component-tag.html',
      'src/new-component-tag.js',
      'test/new-component-tag-test.html'
    ];
    for (const fileIdx in filesToRename) {
      const file = filesToRename[fileIdx];
      console.log('Renaming', file, 'to', file.replace('new-component-tag', newComponentTag));
      await fse.move(destinationDir + '/' + file, destinationDir + '/' + file.replace('new-component-tag', newComponentTag));
    }
    
    // Replace template tag with real tag
    await replaceInFile({
      files: [
        destinationDir + '/**/*',
        destinationDir + '/.circleci/*'
      ],
      from: [ /new-component-tag/g, /new-component-name/g, /NewComponentClass/g, /display-id-stable/g, /display-id-beta/g],
      to: [ newComponentTag, newComponentName, newComponentClass, displayIdStable, displayIdBeta ]
    });
  })();
} else {
  console.log('Invalid command');
}

function _tagToTitleCase(value, outputDelimiter) {
  let parts = value.split('-');

  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(outputDelimiter);
}
