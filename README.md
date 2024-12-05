# Assignment Submission Portal

This is a Next.js application that includes an assignment submission form. The application allows candidates to submit their details.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Darling-dev/Technical-Task-Portal.git
```

### Install Dependencies

Navigate into the project folder and install the dependencies using npm or yarn:

```bash
cd Technical-Task-Portal/

npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory of your project. Add the necessary environment variables.

```env
NEXT_PUBLIC_API_BASE_URL=https://example.com
```

### Run the Project Locally

To run the application in development mode, execute the following command:

```bash
npm run dev
```

By default, the app will be available at `http://localhost:3000`.

## Running the Tests

### Unit and Integration Tests

The project uses Jest for unit tests. To run these tests, use the following commands:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run unit tests with detailed coverage and verbose output
npm run test:unit
```

### Integration Testing with Cypress

The project also uses Cypress for integration testing.

#### Running Cypress in Headless Mode

```bash
npm run test:integration
```

### Running All Tests for CI/CD

To run all tests including linting, Jest unit tests, and Cypress integration tests for continuous integration:

```bash
npm run test:ci
```
