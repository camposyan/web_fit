import { Model, createServer } from "miragejs";

export const mockExerciseRoutes = () => {
     const exerciseRoutes = createServer({
          models: {
               exercise: Model,
          },
          seeds(server) {
               server.create('exercise',
                    {
                         id: '1',
                         ID: 1,
                         NAME: 'Yan Campos',
                         EMAIL: 'camposyan00@gmail.com',
                         CELLPHONE: '(32)98884-3542',
                         IS_WPP_CELL: true,
                         ACTIVE: true,
                    }
               );
               server.create('exercise',
                    {
                         id: '2',
                         ID: 2,
                         NAME: 'Gabriel Azevedo',
                         EMAIL: 'gabrielazevedo@gmail.com',
                         CELLPHONE: '(32)99950-2026',
                         IS_WPP_CELL: true,
                         ACTIVE: false,
                    }
               );
               server.create('exercise',
                    {
                         id: '3',
                         ID: 3,
                         NAME: 'Nikolas Calixto',
                         EMAIL: 'nikolascalixto@gmail.com',
                         CELLPHONE: '(32)99917-9337',
                         IS_WPP_CELL: false,
                         ACTIVE: true,
                    }
               );
               server.create('exercise',
                    {
                         id: '4',
                         ID: 4,
                         NAME: 'Thiago Netto',
                         EMAIL: 'thiagonetto@gmail.com',
                         CELLPHONE: '(32)98703-4137',
                         IS_WPP_CELL: true,
                         ACTIVE: false,
                    }
               );
               server.create('exercise',
                    {
                         id: '5',
                         ID: 5,
                         NAME: 'Júlia Monteiro',
                         EMAIL: 'juliamonteiro@gmail.com',
                         CELLPHONE: '(32)99185-5761',
                         IS_WPP_CELL: true,
                         ACTIVE: true,
                    }
               );
          },
          routes() {
               this.timing = 500
               this.namespace = '/api'
               this.urlPrefix = 'http://localhost:5173'

               this.get("/exercises",
                    (schema) => {
                         return schema.db.exercises
                    },
               )

               this.get('/exercises/:id',
                    (schema, request) => {
                         const id = request.params.id;
                         return schema.db.exercises.find(id);
                    },
               )


               this.post("/exercise",
                    (schema, request) => {
                         const data = JSON.parse(request.requestBody);
                         return schema.db.exercises.insert(data);
                    },
               )

               this.put("/exercise/:id",
                    (schema, request) => {
                         const id = request.params.id;
                         const data = JSON.parse(request.requestBody);
                         return schema.db.exercises.update(id, data);
                    },
               )

               this.delete("/exercise/:id",
                    (schema, request) => {
                         const id = request.params.id
                         schema.db.exercises.remove(id)
                         return {message: 'Deleted'}
                    },
               )
          },


     })

     return exerciseRoutes;
}