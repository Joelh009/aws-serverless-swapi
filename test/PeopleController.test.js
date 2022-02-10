const PeopleController = require('../controller/PeopleController');
const PeopleService = require('../service/PeopleService');
const ErrorConstants = require('../common/constants/errorConstants');
const HttpConstants = require('../common/constants/httpConstants');
const Messages = require('../common/constants/messagesConstants');
const BusinessError = require('../models/error/BusinessError');
const SwapiClient = require('../client/SwapiClient');

describe('PeopleController', () => {
  
    afterAll(() => {
      jest.restoreAllMocks();
    });
  
    test('listar las personas de Star Wars', async () => {
      const fetchResultsSpy = jest.spyOn(SwapiClient, 'getAllPeople').mockResolvedValueOnce(
        {"results" :[
          {
              "nombre":"Luke Skywalker",
              "fecha_nacimiento":"19BBY",
              "color_ojo":"blue",
              "genero":"male",
              "color_cabello":"blond",
              "peso":"172",
              "masa":"77",
              "color_piel":"fair",
              "peliculas":[
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/6/",
                "https://swapi.py4e.com/api/films/7/"
              ],
              "especies":[
                "https://swapi.py4e.com/api/species/1/"
              ],
              "vehiculos":[
                "https://swapi.py4e.com/api/vehicles/14/",
                "https://swapi.py4e.com/api/vehicles/30/"
              ],
              "url":"https://swapi.py4e.com/api/people/1/",
              "creado":"2014-12-09T13:50:51.644000Z",
              "editado":"2014-12-20T21:17:56.891000Z"
          },
          {
              "nombre":"C-3PO",
              "fecha_nacimiento":"112BBY",
              "color_ojo":"yellow",
              "genero":"n/a",
              "color_cabello":"n/a",
              "peso":"167",
              "masa":"75",
              "color_piel":"gold",
              "peliculas":[
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/4/",
                "https://swapi.py4e.com/api/films/5/",
                "https://swapi.py4e.com/api/films/6/"
              ],
              "especies":[
                "https://swapi.py4e.com/api/species/2/"
              ],
              "vehiculos":[
                
              ],
              "url":"https://swapi.py4e.com/api/people/2/",
              "creado":"2014-12-10T15:10:51.357000Z",
              "editado":"2014-12-20T21:17:50.309000Z"
          }
        ]
        }
      );
      console.log('fetchResultsSpy',fetchResultsSpy);  
      
      const resp = await PeopleController.listar();
      const body = JSON.parse(resp.body);
      const size = body.datos.length;
  
      expect(resp.statusCode).toBe(200);
      expect(size).toBe(2);
    });
  

    test(' listarPersonas SWAPI no disponible', async () => {
      const fetchResultsSpy = jest.spyOn(PeopleService, 'getPeople').mockRejectedValueOnce(
        new BusinessError({
          code: ErrorConstants.SERVICE_CONECTION_ERROR.code,
          httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
          messages: ErrorConstants.SERVICE_CONECTION_ERROR.message,
        })
      );
      console.log('fetchResultsSpy',fetchResultsSpy);  
      const resp = await PeopleController.listar();
      const body = JSON.parse(resp.body);
      console.log('body',body);  
      expect(resp.statusCode).toBe(500);
      expect(body.datos).toBe(null);
    });
  
  
    test('listar por Id a una persona de Star Wars', async () => {
      const fetchResultsSpy = jest.spyOn(PeopleService, 'getPeopleById').mockResolvedValueOnce(
        {
            "nombre": "Luke Skywalker",
            "fecha_nacimiento": "19BBY",
            "color_ojo": "blue",
            "genero": "male",
            "color_cabello": "blond",
            "peso": "172",
            "masa": "77",
            "color_piel": "fair",
            "peliculas": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/2/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/6/",
                "https://swapi.py4e.com/api/films/7/"
            ],
            "especies": [
                "https://swapi.py4e.com/api/species/1/"
            ],
            "vehiculos": [
                "https://swapi.py4e.com/api/vehicles/14/",
                "https://swapi.py4e.com/api/vehicles/30/"
            ],
            "url": "https://swapi.py4e.com/api/people/1/",
            "creado": "2014-12-09T13:50:51.644000Z",
            "editado": "2014-12-20T21:17:56.891000Z"
        }
    
      );
      console.log('fetchResultsSpy',fetchResultsSpy);  
      const resp = await PeopleController.listarPorId({pathParameters: { id: '1' }});
      const body = JSON.parse(resp.body);
  
      console.log('body',body);
      expect(resp.statusCode).toBe(200);
      expect(typeof body.datos).toMatch('object');
    });
  
    test(' listarPersonasPorId con id no encontrado', async () => {
      const fetchResultsSpy = jest.spyOn(PeopleService, 'getPeopleById').mockRejectedValueOnce(
        new BusinessError({
          code: ErrorConstants.SERVICE_CONECTION_ERROR.code,
          httpCode: HttpConstants.STATUS_NOT_FOUND.code,
          messages: Messages.MSG_ERROR_PEOPLE_NOT_FOUND,
        })
      );
      console.log('fetchResultsSpy',fetchResultsSpy);  
      const resp = await PeopleController.listarPorId({pathParameters: { id: '0' }});
      const body = JSON.parse(resp.body);
  
      console.log('body',body);
      expect(resp.statusCode).toBe(404);
      expect(body.codMensaje).toBe(-1);
    });
  
  });