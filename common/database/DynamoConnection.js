const AWS = require('aws-sdk');
//const HttpConstants = require('../common/constants/httpConstants');
//const ErrorConstants = require('../common/constants/errorConstants');
//const BusinessError = require('../models/error/BusinessError');
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.REGION
});
const Dynamo = {
    async getAll(tableName) {
        const params = {
            TableName: tableName
        };

        const data = await documentClient.scan(params).promise();
        console.log('DynamoDB data:',data);

        if (!data) {
            throw Error(`Ocurrió un error obteniendo los datos de la tabla ${TableName}`);
        }
        return data;
    },

    async get(id, TableName) {
        const params = {
            TableName,
            Key: {id},
        };

        const data = await documentClient.get(params).promise();
        console.log(data);

        if (!data || !data.Item) {
            //throw Error(`Ocurrió un error obteniendo la data para el id ${id} de la tabla ${TableName}`);
            return data;
        }
        
        return data.Item;
    },

    async write(data, TableName) {
        if (!data.id) {
            throw Error('Id no ingresado');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();
        console.log(res);

        if (!res) {
            throw Error(`Ocurrió un error insertando el id ${data.id} en la tabla ${TableName}`);
        }

        return data;
    },

    async updatePlanet(data, TableName) {
        if (!data.id) {
            throw Error('Id no ingresado');
        }

        const params = {
            TableName,
            Key: {id : data.id},
            ExpressionAttributeValues: {
                ':nombre': data.nombre,
                ':periodo_rotacion': data.periodo_rotacion,
                ':periodo_orbital': data.periodo_orbital,
                ':diametro': data.diametro,
                ':clima': data.clima,
                ':gravedad': data.gravedad,
                ':terreno': data.terreno,
                ':superficie_agua': data.superficie_agua,
                ':poblacion': data.poblacion,
                ':residentes': data.residentes,
                ':peliculas': data.peliculas,
                ':urlNew': data.url,
                ':actualizado': data.actualizado
            },
            ExpressionAttributeNames: {
                "#urlNew": "url",
            },
            UpdateExpression: `SET  nombre = :nombre,
                                    periodo_rotacion = :periodo_rotacion,
                                    periodo_orbital = :periodo_orbital,
                                    diametro = :diametro,
                                    clima = :clima,
                                    gravedad = :gravedad,
                                    terreno = :terreno,
                                    superficie_agua = :superficie_agua,
                                    poblacion = :poblacion,
                                    residentes = :residentes,
                                    peliculas = :peliculas,
                                    #urlNew = :urlNew,
                                    actualizado = :actualizado`,
            ReturnValues: "ALL_NEW"
        };

        const res = await documentClient.update(params).promise();
        console.log(res);

        if (!res) {
            return res;
        }

        return data;
    },

    async delete(id, TableName) {
        const params = {
            TableName,
            Key: {
                id,
            },
        };

        return documentClient.delete(params).promise();
    },
};
module.exports = Dynamo;
