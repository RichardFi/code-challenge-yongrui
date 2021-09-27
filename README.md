# code-challenge-yongrui

## Features
* Basics: React + Node + TypeScript + Express + Mongodb + Mongoose
* UI Framework: Material UI
* State Management: React Hooks

## Quick Start
Before starting, install [Git](https://git-scm.com/downloads), [Docker](https://www.docker.com/get-started) and MongoDB.
```sh
$ git clone https://github.com/RichardFi/code-challenge-yongrui.git
```

```sh
$ cd amagbackend
$ npm install
$ npm run dev
```
Open a new terminal
```sh
$ cd amagfrontend
$ npm install
$ npm start
```
The client is hosted on http://localhost:3000 and server is hosted on http://localhost:5000.

## Testing
```sh
$ cd amagbackend
$ npm test
```
Tests for each api endpoints.

## Database Design
In MongoDB, there is a collection named `sites`, and the schema is 
```
Site {
  name: string
  region: string
  description: string
  latitude: number
  longitude: number
  _id: string
  update: Date
  history: Array
}
```
`history` is a empty array when the site is just created. Each time the site is updated, the site data before the update can be stored in history. Through get API / sites/:id/history endpoint, all updated history can be found through site id.

