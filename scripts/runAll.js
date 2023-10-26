const shell = require('shelljs')

function fetchTennisCourtsData () {
  console.log('Start fetching tennis courts data from various API sources.')
  if (shell.exec('node scripts/fetchTennisCourtsData.js').code !== 0) {
    shell.echo('Error: Fetch Tennis Courts API data failed.')
    shell.exit(1)
  }
}

function integrateTennisCourtsData () {
  console.log('Start integrating tennis courts data.')
  if (shell.exec('node scripts/integrateTennisCourtsData.js').code !== 0) {
    shell.echo('Error: Integration of Tennis Courts Data failed.')
    shell.exit(1)
  }
}

function updatePhoneNumbers () {
  console.log('Start updating phone numbers data from different sources.')
  if (shell.exec('node scripts/updatePhoneNumbers.js').code !== 0) {
    shell.echo('Error: Phone Numbers Update failed.')
    shell.exit(1)
  }
}

function addMissingCounty () {
  console.log('Start adding missing County data.')
  if (shell.exec('node scripts/addMissingCounty.js').code !== 0) {
    shell.echo('Error: Adding Missing County Data failed')
    shell.exit(1)
  }
}

function removeInvalidHouseNumbers () {
  console.log('Start removing invalid house numbers data.')
  if (shell.exec('node scripts/removeInvalidHouseNumbers.js').code !== 0) {
    shell.echo('Error: Removing Invalid House Number failed')
    shell.exit(1)
  }
}

function main () {
  fetchTennisCourtsData()
  integrateTennisCourtsData()
  updatePhoneNumbers()
  addMissingCounty()
  removeInvalidHouseNumbers()
}

main()
