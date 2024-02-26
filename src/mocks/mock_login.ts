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

               this.post("/login",
                    (schema, request) => {
                         const data = JSON.parse(request.requestBody);
                         
                         return schema.db.users.find(data.EMAIL);
                    },
               )
          },
     })

     return loginRoutes;
}