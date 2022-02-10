const { reduce } = require('lodash')

module.exports.translate = (response) => {
    const mapping = {
        'birth_year': 'fecha_nacimiento',
        'eye_color': 'color_ojo',
        'films': 'peliculas',
        'gender': 'genero',
        'hair_color': 'color_cabello',
        'height': 'altura',
        'homeworld': 'planeta',
        'mass': 'masa',
        'name': 'nombre',
        'skin_color': 'color_piel',
        'created': 'creado',
        'edited': 'modificado',
        'species': 'especie',
        'starships': 'naves',
        'url': 'url',
        'vehicles': 'vehiculos',
        'created': 'creado',
        'edited': 'editado'
    }

    return reduce(response, (result, value, key) => {
        result[(mapping[key]) ? (mapping[key]): key] = value
        return result
    }, {})

}