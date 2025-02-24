# CLIENT GATEWAY
El gateway es el punto de comunicacion entre nuestros clientes y nuestros servicios.
Es el encargado de recibir peticiones, enviarlas a los servicios correspondientes y 
devolver la respuesta al cliente.

## Dev
1. Clonar el repo
2. Instalar dependencias
3. Crear un archivo `.env` basado en `env.template`
4. Tener levantados los microservisios que se van a consumir
5. Levantar el proyecto con `npm run start:dev`


## Nats:
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats