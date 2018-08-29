all:
	@echo "no default"

.PHONY: run/example
run/example:
	@node example/

.PHONY: run/example/payload
run/example/payload:
	@echo '["setItem", "foo", "bar"]' | nc localhost 3330

.PHONY: lint/fix/example
lint/fix/example:
	@standard --fix example/*

.PHONY: test
test:
	@npm test

.PHONY: lint
lint:
	@npm run lint

.PHONY: lint/fix
lint/fix:
	@npm run lint:fix
