# Car Rental

Angular application for managing car rentals. This project combines an Angular 19 frontend with Angular Material and a local Node.js backend.

## 📦 Requirements

- **Node.js** version 18 or higher
- **npm** version 9 or higher

## 🚀 Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## ▶️ Running the Project

To start both the Angular frontend and the Node.js backend simultaneously, run:

```bash
npm start
```

This command runs:
- `node server.js` (backend server)
- `ng serve` (Angular development server)

Access the app at: [http://localhost:4200](http://localhost:4200)

## 🔧 Available Scripts

| Command            | Description                                              |
|--------------------|----------------------------------------------------------|
| `npm start`        | Starts both backend and frontend                         |
| `npm run server`   | Runs only the backend (`server.js`)                      |
| `npm run client`   | Runs only the Angular frontend (`ng serve`)              |
| `npm run build`    | Builds the app for production into the `dist/` folder    |
| `npm run watch`    | Watches and rebuilds in development mode                 |
| `npm test`         | Runs unit tests using Karma and Jasmine                  |

## 🧪 Running Tests

To execute unit tests:

```bash
npm test
```

## 🛠️ Technologies Used

- [Angular 19](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [NgRx Component Store](https://ngrx.io/guide/component-store)
- [RxJS](https://rxjs.dev/)
- [Node.js](https://nodejs.org/)
- [Concurrently](https://www.npmjs.com/package/concurrently)

## 📁 Project Structure

```
car-rental/
├── src/                  # Angular source code
├── server.js             # Node.js backend server
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 📄 License

This project is private. Usage and distribution require the author's permission.
