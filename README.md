## RETO TÉCNICO BACKEND NODEJS + SERVERLESS + AWS + SWAPI + DYNAMODB
---
API en Node.js con el framework Serverless para un despliegue en AWS.

#### Pre-requisitos

* Contar con un usuario de AWS 
* NodeJS instalado

#### Instalación 
Instalar dependencias con NPM:
```bash
npm install
```
Configurar ACCCESS_KEY:
```bash
serverless config credentials --provider aws --key <ACCESS_KEY> --secret <SECRET_ACCESS_KEY>
```

#### Despliegue

Despliegue en AWS, ejecutar el siguiente comando:
```bash
serverless deploy
```

#### Integracion con SWAPI

Endpoints de la integración con SWAPI

* `GET` https://xxxx....amazonaws.com/dev/personas : Lista las personas del api SWAPI.
* `GET` https://xxxx....amazonaws.com/dev/personas/{id}: Lista la persona del api SWAPI por el parametro **id**.

#### CRUD DynamoDB

Endpoints de la integración con SWAPI

* `GET` https://xxxx....amazonaws.com/dev/personas : Lista las personas del api SWAPI.
* `GET` https://xxxx....amazonaws.com/dev/personas/{id}: Lista una persona del api SWAPI.
* `GET` https://xxxx....amazonaws.com/dev/planetas : Lista los planetas de Star Wars registrados en DynamoDB.
* `GET` https://xxxx....amazonaws.com/dev/planetas/{id}: Lista un planeta de Star Wars registrado en DynamoDB.
* `POST` https://xxxx....amazonaws.com/dev/planetas : Registra planeta de Star Wars en DynamoDB.
    ```
    {
        "nombre": "Tatooine2",
        "periodo_rotacion": 23,
        "periodo_orbital": 304,
        "diametro": 10465,
        "clima": "arido",
        "gravedad": "1 standard",
        "terreno": "desert",
        "superficie_agua": "1",
        "poblacion": 200000,
        "residentes": [],
        "peliculas": [],
        "url": "http://url_prueba/1"
    }
    ```
* `PUT` https://xxxx....amazonaws.com/dev/planetas: Actualiza planeta de Star Wars en DynamoDB.
    ```
    {
        "id": "68f43895-8582-4eb7-a70b-ec349089242f",
        "nombre": "Nuevo Planeta",
        "periodo_rotacion": 23,
        "periodo_orbital": 304,
        "diametro": 10465,
        "clima": "marido",
        "gravedad": "10 standard",
        "terreno": "desert",
        "superficie_agua": "1",
        "poblacion": 200000,
        "residentes": [],
        "peliculas": [],
        "url": "http://url_prueba/1"
    }
    ```
* `DELETE` https://xxxx....amazonaws.com/dev/planetas/{id}: Elimina el planeta de Star Wars registrado en DynamoDB.


#### Tests

Ejecutar el siguiente comando:
```bash
npm run test
```

#### Documentación OpenAPI/Swagger

Para poder visualizar los recursos del Api, ingresar a esta url: 
```bash
https://xxxx....amazonaws.com/dev/docs/index.html
```

#### Eliminar implementación

Ejecutar el siguiente comando:
```bash
serverless remove
```