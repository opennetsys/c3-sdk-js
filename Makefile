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
test: test/lib test/util

.PHONY: test/lib
test: test/lib
	@npm test

.PHONY: test/util
test/util: test/util/hexutil test/util/hashlib test/util/txparamcoder

.PHONY: test/util/hexutil
test/util/hexutil:
	@node util/hexutil_test.js

.PHONY: test/util/hashlib
test/util/hashlib:
	@node util/hashlib_test.js

.PHONY: test/util/txparamcoder
test/util/txparamcoder:
	@node util/txparamcoder_test.js

.PHONY: lint
lint:
	@npm run lint

.PHONY: lint/fix
lint/fix:
	@standard --fix index.js
	@standard --fix util/*
