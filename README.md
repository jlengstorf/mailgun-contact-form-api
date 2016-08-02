# Mailgun Contact Form API

[![Build Status](https://travis-ci.org/jlengstorf/mailgun-contact-form-api.svg?branch=master)](https://travis-ci.org/jlengstorf/mailgun-contact-form-api)

Simple Node.js REST API to handle contact form submissions. Developed as part of a tutorial.

The goal of this app is to demonstrate:

- Building a simple API using [hapi](http://hapijs.com/)
- Writing tests using [Jasmine](http://jasmine.github.io/2.4/introduction.html)
- Sending messages using [Mailgun](http://mailgun.com/)

## Quick Start

**Requirements:**
- A free [Mailgun account](http://mailgun.com/) with a verified domain

```bash
# Clone the repo
git clone git@github.com:jlengstorf/mailgun-contact-form-api.git

# Move into the newly-cloned directory
cd mailgun-contact-form-api

# Install dependencies
npm install

# Copy the `.env.example`
cp .env.example .env

# Add your Mailgun info and email address to `.env`
vim .env

# Start the app
npm start
```

Visit http://localhost:5000/status in your browser to verify that the app is running — it should display "Running!".

## Send a Test Message

Once the app is running, you can send a test message by copy-pasting the following command into the command line.

```bash
curl -H "Content-Type: application/json" -X POST -d '{"name":"cURL Test","email":"curl@example.com", "message":"Sent via curl!\n\nNeat, right?"}' http://localhost:5000/submit
```
