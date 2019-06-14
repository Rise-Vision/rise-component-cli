# Example Web Component [![CircleCI](https://circleci.com/gh/Rise-Vision/rise-example-component/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-example-component/tree/master)

## Introduction

`rise-example-component` is a Polymer 3 Web Component which serves as an example of the project structure used when creating Rise Web Components.

Instructions for demo page here:
https://github.com/Rise-Vision/rise-example-component/blob/master/demo/README.md


## Project contents

### Folders

- .circleci
  It should only contain .config.yml, Circle CI's config file
- config
  In case the component needs environment specific settings, a file per environment  exporting these settings is required (eg, stage.js, prod.js)
- demo
  Contains a demo page to showcase the component. It relies on a staging version already deployed to GCS
- e2e
  Implements the presentation to be used when running e2e tests
- html
  The build process requires html/index.html to be present. It's not used anywhere else
- src
  Contains the actual implementation of the component
- test
  Contains unit tests and integration tests

### Files

.eslintignore
.eslintrc.js
.gitignore
package.json
polymer.json
wct.conf.js
