# sevaux.github.io

Site personnel public de Marc Sevaux, publie avec GitHub Pages sur
[https://sevaux.github.io](https://sevaux.github.io).

## Build local

```sh
./scripts/build-pages.sh
node ./scripts/check-local-links.mjs ./_site
```

Chaque push sur `main` construit et deploie le site. Les commits qui ne
modifient que `README.md` et/ou `LICENSE` ne lancent pas de deploiement.
