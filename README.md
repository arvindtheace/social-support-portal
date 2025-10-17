## Summary

This application is a social support portal designed to provide financial assistance to individuals in need. It consists of a user-friendly interface where users can fill out a form with their personal and financial information. The application will then use this information to assess the user's eligibility for financial assistance and provide a decision on whether to approve or reject the application. The application is built using React, Redux Toolkit, MUI and OpenAI, and is designed to be scalable and secure.

## Quick Start

```
npm i

npm run start
```

- The app consists of a vite server serving the frontend and a normal Node server serving a simple backend.
- The Node server acts as a proxy to send requests to the OpenAI API. It won't work without `OPENAI_API_KEY` in the `.env` file. The key will be shared separately.
- The `submit` call in the end summarises all the data provided by the user by printing it out in the console.

## Features/Architecture
- state is handled temporarily by React Hook Form and then committed to Redux.
- The main form is split into 3 steps and there are components for each. There are also separate components for each input type. The AI assist is treated differently.
- I've tried my best for implementing a bi-ligual application, Translations might be slightly off, apologies for that.
- Basic validations for the form are present