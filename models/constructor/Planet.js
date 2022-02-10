class Planet {

    constructor (
        requestData
    ){
        this.id = requestData.id;
        this.nombre = requestData.nombre;
        this.periodo_rotacion = requestData.periodo_rotacion;
        this.periodo_orbital = requestData.periodo_orbital;
        this.diametro = requestData.diametro;
        this.clima = requestData.clima;
        this.gravedad = requestData.gravedad;
        this.terreno = requestData.terreno;
        this.superficie_agua = requestData.superficie_agua;
        this.poblacion = requestData.poblacion;
        this.residentes = requestData.residentes;
        this.peliculas = requestData.peliculas;
        this.url = requestData.url;
        this.creado = requestData.creado;
        this.actualizado = requestData.actualizado;
    }

}

module.exports = Planet;