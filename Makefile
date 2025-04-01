SHELL := bash
SRC = $(shell find src -type f)

.DEFAULT_GOAL := help

.PHONY: clean prepack test help

clean: ## Clean all build and install artifacts
	@git clean -dfX

dist: node_modules $(SRC) tsconfig.json
	@pnpm exec tsc
	@touch dist

node_modules: package.json pnpm-lock.yaml
	@pnpm install --frozen-lockfile --prefer-offline --reporter=silent
	@touch node_modules

prepack: dist ## Package for distribution

test: node_modules $(SRC) ## Run tests
	@pnpm exec jest ./src

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
