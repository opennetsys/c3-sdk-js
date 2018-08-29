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

.PHONY: test/hexutil
test/hexutil:
	@node util/hexutil_test.js

.PHONY: test/hashlib
test/hashlib:
	@node util/hashlib_test.js

.PHONY: test/txparamcoder
test/txparamcoder:
	@node util/txparamcoder_test.js

.PHONY: lint
lint:
	@npm run lint

.PHONY: lint/fix
lint/fix:
	@standard --fix index.js
	@standard --fix util/*
