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
                         NAME: 'PUXADA ALTA',
                         CATEGORY: 'COSTAS',
                         CATEGORY_ID: 0,
                         DESCRIPTION: 'Puxar a barra até a altura do peito e voltar.'
                    }
                    );
                    server.create('exercise',
                    {
                         id: '2',
                         ID: 2,
                         NAME: 'SUPINO INCLINADO',
                         CATEGORY: 'PEITO',
                         CATEGORY_ID: 4,
                         DESCRIPTION: 'Descer a barra até o peito e voltar.'
                    }
                    );
                    server.create('exercise',
                    {
                         id: '3',
                         ID: 3,
                         NAME: 'ROSCA MARTELO',
                         CATEGORY: 'BÍCEPS',
                         CATEGORY_ID: 2,
                         DESCRIPTION: 'Erguer os haltéres com a mão na posição neutra.'
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

               this.get('/exercise/:id',
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
                         return { message: 'Deleted' }
                    },
               )
          },
     })

     return exerciseRoutes;
}