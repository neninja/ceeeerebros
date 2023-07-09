# ceeeerebros

[![emojicom](https://img.shields.io/badge/emojicom-%F0%9F%90%9B%20%F0%9F%86%95%20%F0%9F%92%AF%20%F0%9F%91%AE%20%F0%9F%86%98%20%F0%9F%92%A4-%23fff)](http://neni.dev/emojicom) [![contributing](https://img.shields.io/badge/CONTRIBUTING-CONTRIBUINDO-%23fff)](http://neni.dev/contributing)

Contador de cérebros do [zombie dice](https://ludopedia.com.br/jogo/zombie-dice)

## Desenvolvimento

> Caso prefira, os comandos usuáris já estão mapeados no [Makefile](Makefile). Podendo usar `make up`, `make down`, `make start` etc

### Ambiente

1. Inicie o container 

```sh
docker-compose up -d
```

> O ambiente pode ser parado com ``docker-compose down``

2. Baixe as dependências 

```sh
docker-compose exec app yarn
```

### Execução

1. Inicie o servidor

```sh
docker-compose exec app yarn start
```

2. Acesse `localhost:3000`

### Testes

```sh
docker-compose exec app yarn test
```
