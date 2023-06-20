# CodeWizards-API

## Despliegue
1. Para desplegar la aplicación sobre un contenedor basta con ejecutar 
```shell
docker build -t <nombre_del_contenedor>
```
2. Una vez constriuda la imagen ya solo ejecutamos el siguiente comando

```shell
docker run -p 3000:3000 <nombre_del_contenedor>
```
