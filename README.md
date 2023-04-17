# nodejs-microservices-bootstrap

This is the mono-repository containing unary/streaming event-driven microservices bootstrap implementation.

## Overview

![nodejs-microservices-bootstrap C4 design](/docs/img/nodejs-microservices-bootstrap-c4-design.jpg)

## Setup

### Prerequisites

- [Make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/)

Run the following command to install all dependencies:

```bash
make install
```

## Running development

Run the following from the root directory to build all projects

```bash
make dev
```

Once the new package is added to the repository, reinstallation of dependencies will be necessary:

```bash
make restart
```

## Building the project

Run the following from the root directory to build all projects

```bash
make build
```

## Docker (build performance)

Each project has its own `Dockerfile` file. Docker
builds must be run from the root folder of the repo pointing to the
desired `Dockerfile` so that Turbo can [prune
workspaces](https://turbo.build/repo/docs/handbook/deploying-with-docker#the-solution).

## Documentation

### Sample Client API

The Swagger style documentation for RESTfull API with examples is available locally: http://localhost:8031/documentation
