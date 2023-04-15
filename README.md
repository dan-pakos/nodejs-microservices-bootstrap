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

## Running tests

This project uses [Jest](https://jestjs.io/) for unit and integration tests. Run
all the tests from the mono-repo root directory using

The tests can be run in individual projects with the `test` alias for example

```
cd services/service-a
make test --profile=service-a
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
