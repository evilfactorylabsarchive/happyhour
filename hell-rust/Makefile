default: www-release

test:
	cargo test

build: test
	cargo build

release: test
	cargo build --release

deploy: www-release
	cd www && yarn deploy && cd ..

wasm-build: build
	wasm-pack build

wasm-release: release
	wasm-pack build --release

www-link: build
	cd pkg && yarn link && cd ../www && yarn bootstrap && cd ..

www-start: wasm-build
	cd www && yarn start

www-release: wasm-release
	cd www && yarn build && cd ..
