# Smartgas - Fuel Price Observatory

Smartgas is a crowdsourcing application designed for tracking fuel prices. It was developed as part of a Software Engineering course at the National Technical University of Athens (NTUA) in 2018.

## Project Description

The goal of the project is to provide an online platform where users can electronically record and share fuel prices from various gas stations. By leveraging crowdsourcing, volunteers help build a comprehensive database of real-time fuel costs to help others find the best prices.

## Technical Specifications

The application is divided into a backend and frontend architecture:

Backend: Developed using Node.js and Express.js.

Database: MySQL serves as the primary database, while Redis is used to manage session tokens (JWT invalidation).

Frontend: Built with Angular and Angular Material for a responsive, user-friendly interface.

Mapping: Spatial display of data is handled through a map service (like Google Maps) using JavaScript libraries like OpenLayers or Mapbox.

## Features

User Roles: Supports Registered Users (volunteers), Administrators, and Readers.

Location Services: Users can find nearby gas stations or select locations from a dropdown list.

Fuel Entry Management: Registered users can add new price entries, and administrators can manage fuel types.

Search: Includes a max-distance slide bar to filter fuel price entries based on proximity.

Responsiveness: The UI is designed to function uniformly across desktop, tablet, and mobile devices.

## Getting Started

### Prerequisites

To run the project locally, you will need:

MySQL and Redis (installed and configured).

Gulp (global installation).

Node.js environment.

### Installation

Clone the repository.

Install dependencies, run automated tests, and bootstrap the servers by executing:

$(npm bin)/gulp

## License

The SmartGas is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 
