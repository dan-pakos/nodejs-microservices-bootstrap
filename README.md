# nodejs-microservices-bootstrap

This is the mono-repository containing streaming and even-driven microservices design implementation.

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

## Building the project

Run the following from the root directory to build all projects

```bash
make build
```

## Running tests

This project uses [Jest](https://jestjs.io/) for unit and integration tests. Run
all the tests from mono-repo root directory using

The tests can be run in individual projects with the `test` alias for example

```
cd services/service-a
make test
```

## Docker (build performance)

Each project has its own `Dockerfile` file. Docker
builds must be run from the root folder of the repo pointing to the
desired `Dockerfile` so that Turbo can [prune
workspaces](https://turbo.build/repo/docs/handbook/deploying-with-docker#the-solution).

For example:

```bash
cd services/service-a/
make dev
```


