up:
	@docker-compose up -d

down:
	@docker-compose down

i:
	@docker-compose exec app yarn

start:
	@docker-compose exec app yarn start
