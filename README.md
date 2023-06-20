# CodeWizards-API

## Despliegue
1. Para desplegar la aplicación sobre un contenedor basta con ejecutar 
```shell
docker build -t docker build -t apinodejs:codewizards --no-cache .
```
2. Una vez constriuda la imagen ya solo ejecutamos el siguiente comando

```shell
docker run -p 3000:3000 --name apinodejs apinodejs:codewizards
```
3. Si se quiere eliminar el contenedor
```shell
docker image rm apinodejs:codewizards --force
```
