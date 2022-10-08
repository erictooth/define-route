SHELL := bash
SRC = $(shell find src -type f)

.DEFAULT_GOAL := help

.PHONY: clean prepack test help

clean: ## Clean all build and install artifacts
	@git clean -dfX

dist-cjs: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src --out-dir dist-cjs --config module.type=commonjs --config sourceMaps=true --config jsc.target=es2019 --ignore **/*.test.ts
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-cjs
	@touch dist-cjs

dist-esm: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src --out-dir dist-esm --config sourceMaps=true --config jsc.target=es2020 --ignore **/*.test.ts
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-esm
	@touch dist-esm

node_modules: package.json pnpm-lock.yaml
	@pnpm install --frozen-lockfile --prefer-offline --reporter=silent
	@touch node_modules

prepack: dist-cjs dist-esm ## Package for distribution

test: node_modules $(SRC) ## Run tests
	@pnpm exec jest ./src

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
