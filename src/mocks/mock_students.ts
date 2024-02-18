import { Model, createServer } from "miragejs";

export const mockStudentsRoutes = () => {
     const studentRoutes = createServer({
          models: {
               student: Model,
          },
          seeds(server) {
               server.create('student',
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
               server.create('student',
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
               server.create('student',
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
               server.create('student',
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
               server.create('student',
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

               this.get("/students",
                    (schema) => {
                         return schema.db.students
                    },
               )

               this.get('/students/:id',
                    (schema, request) => {
                         const id = request.params.id;
                         return schema.db.students.find(id);
                    },
               )


               this.post("/student",
                    (schema, request) => {
                         const data = JSON.parse(request.requestBody);
                         return schema.db.students.insert(data);
                    },
               )

               this.put("/student/:id",
                    (schema, request) => {
                         const id = request.params.id;
                         const data = JSON.parse(request.requestBody);
                         return schema.db.students.update(id, data);
                    },
               )

               this.delete("/student/:id",
                    (schema, request) => {
                         const id = request.params.id
                         schema.db.students.remove(id)
                         return {message: 'Deleted'}
                    },
               )
          },


     })

     return studentRoutes;
}