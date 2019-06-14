# Rise Component CLI

Utility for creating new Polymer based components.

## Install

Clone the repository and run `npm install`.

## Creating a component

### Steps before creating the project

- Create two Displays on https://apps.risevision.com, under Rise Vision company
  - Name the first one: 'Content E2E your-component-name beta electron ubuntu'
  - Name the second one: 'Content E2E your-component-name stable electron ubuntu'

### Creating the project

Run `npm run new` and follow the wizard. You can copy the generated code into the root of your repository.

### Extra steps after creating the project

- After creating your repository on GitHub and pushing your changes, you will need to tell CircleCI to build your project
- Since we depend on checking out other projects, you will need to go to `Settings => Permissions => Checkout SSH Keys` and add a new user key.
- To run e2e tests, you will need to create a branch prefixed with `e2e/`. After building the first time, e2e tests will fail because the expected screenshot has not been setup. You can grab the expected screenshot by opening the `test-e2e-electron-beta` workflow step, under the `containers` tab. This file will need to be uploaded to the `risevision-display-screenshots` with name matching the display ids previously created. If you had `RYARGCAQHWQ3` and `3KDV24T9TGEX`, you will need to upload `RYARGCAQHWQ3.jpg` and `3KDV24T9TGEX.jpg` (both files are copies of the expected image previously downloaded).
- Re running the tests should now succeeed.

### General branch naming conventions

- `feature/chore/fix`: if you don't need to run e2e tests
- `e2e/`: if you want to run e2e tests when pushing changes
- `master`: besides running e2e tests, it will deploy to beta
- `build/stable`: once the changes are merged to `master`, you should rebase `build/stable` so it matches master. Doing this will run e2e and deploy to stable.

## Generated project contents

### Folders

- .circleci
  It contains .config.yml, Circle CI's config file
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

- .eslintignore
- .eslintrc.js
- .gitignore
- package.json
- polymer.json
- wct.conf.js
