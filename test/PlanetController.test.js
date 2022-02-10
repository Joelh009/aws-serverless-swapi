const PlanetController = require('../controller/PlanetController');
const PlanetService = require('../service/PlanetService');


describe('PlanetController', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('listar planetas', async () => {
        const fetchResultsSpy = jest.spyOn(PlanetService, 'getAllPlanets').mockResolvedValueOnce(
            
            [
                {
                    "id": "4e54d826-ab55-4b6e-81ed-893cae563e43",
                    "nombre": "Tatooine1",
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
                    "url": "http://url_prueba/1",
                    "creado": "10/02/2022 04:32:48",
                    "actualizado": ""
                },
                {
                    "id": "9804efe4-98f0-4038-9fac-ad007ab5169c",
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
                    "url": "http://url_prueba/2",
                    "creado": "10/02/2022 12:31:08",
                    "actualizado": ""
                }
            ]
        );
        console.log('fetchResultsSpy',fetchResultsSpy);  
        const resp = await PlanetController.listar();
        const body = JSON.parse(resp.body);
        const size = body.datos.length;
    
        expect(resp.statusCode).toBe(200);
        expect(size).toBe(2);
    });

    test('listar planeta por ID', async () => {
        const fetchResultsSpy = jest.spyOn(PlanetService, 'getPlanetById').mockResolvedValueOnce(
            
            
                {
                    "id": "4e54d826-ab55-4b6e-81ed-893cae563e43",
                    "nombre": "Tatooine1",
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
                    "url": "http://url_prueba/1",
                    "creado": "10/02/2022 04:32:48",
                    "actualizado": ""
                }
            
        );
        console.log('fetchResultsSpy',fetchResultsSpy);  
        const resp = await PlanetController.listarPorId({pathParameters: { id: '4e54d826-ab55-4b6e-81ed-893cae563e43' }});
        const body = JSON.parse(resp.body);
        const size = body.datos.length;
    
        expect(resp.statusCode).toBe(200);
        expect(typeof body.datos).toBe('object');
    });

});