# NPM Global-Turbo commands

install:
	npm install
lint: install
	npm run lint
format: install
	npm run format
build: install
	npm run build
precommit: install
	npm run precommit
test: install
	npm test

## Services & Apps

# set default profile to none
profile := "main"

intro:
	@echo trying to use profile: "$(profile)"

rebuild: intro
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) build --no-cache
dev: intro
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) up
logs: intro
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) logs -f
restart: intro
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) down
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) build --no-cache
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) up --force-recreate --renew-anon-volumes
down: intro
	@docker-compose -f docker-compose-dev.yml --env-file .env.development --profile $(profile) down