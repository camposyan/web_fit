import { Model, createServer } from "miragejs";

export const mockLoginRoutes = () => {
     const loginRoutes = createServer({
          models: {
               user: Model,
          },
          seeds(server) {
               server.create('user',
                    {
                         id: '1',
                         EMAIL: 'camposyan00@gmail.com',
                         PASSWORD: '12345678',
                         ACTIVE: true,
                    }
               );
          },
          routes() {
               this.timing = 500
               this.namespace = '/api'
               this.urlPrefix = 'http://localhost:5173'

               // this.get("/users",
               //      (schema) => {
               //           return schema.db.users
               //      },
               // )

               // this.get('/users/:id',
               //      (schema, request) => {
               //           const id = request.params.id;
               //           return schema.db.users.find(id);
               //      },
               // )


               this.post("/login",
                    (schema, request) => {
                         const data = JSON.parse(request.requestBody);
                         return schema.db.users.find(data.id);
                    },
               )

               // this.put("/user/:id",
               //      (schema, request) => {
               //           const id = request.params.id;
               //           const data = JSON.parse(request.requestBody);
               //           return schema.db.users.update(id, data);
               //      },
               // )

               // this.delete("/user/:id",
               //      (schema, request) => {
               //           const id = request.params.id
               //           schema.db.users.remove(id)
               //           return {message: 'Deleted'}
               //      },
               // )
          },


     })

     return loginRoutes;
}