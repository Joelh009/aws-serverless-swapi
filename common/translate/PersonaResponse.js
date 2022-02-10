class PersonaResponse{

    constructor(resultData){
        this.nombre = resultData.name;
        this.fecha_nacimiento = resultData.birth_year;
        this.color_ojo = resultData.eye_color;
        this.genero = resultData.gender;
        this.color_cabello = resultData.hair_color;
        this.peso = resultData.height;
        this.masa = resultData.mass;
        this.color_piel = resultData.skin_color ;
        this.peliculas = resultData.films;
        this.especies = resultData.species;
        this.naves = resultData.starships;
        this.vehiculos = resultData.vehicles;
        this.url = resultData.url;
        this.creado = resultData.created;
        this.editado = resultData.edited ;
    }
}
module.exports = PersonaResponse;