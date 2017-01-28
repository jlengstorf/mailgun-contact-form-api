// Load Jasmine and a reporter.
const Jasmine = require('jasmine');
const Reporter = require('jasmine-terminal-reporter');

// Create new instances of each.
const jasmine = new Jasmine();
const reporter = new Reporter({ isVerbose: true });

// Configure Jasmine.
jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    'appSpec.js',
    '**/*[sS]pec.js',
  ],
  helpers: [
    'helpers/**/*.js',
  ],
});

// Add the custom reporter.
jasmine.addReporter(reporter);

// Run the tests.
jasmine.execute();
