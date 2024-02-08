import { createServer } from "miragejs";
import { UsersListType } from "../../types/users";

export const mockUserRoutes = () => {
     const userRoutes = createServer({
          routes() {
               this.get("/api/users", (): UsersListType[] => (
                    [
                         {
                              ID: 1,
                              NAME: 'Yan Campos',
                              EMAIL: 'camposyan00@gmail.com',
                              CELLPHONE: '(32)98884-3542',
                              IS_WPP_CELL: true,
                              ACTIVE: true,
                         },
                         {
                              ID: 1,
                              NAME: 'Gabriel Azevedo',
                              EMAIL: 'camposyan00@gmail.com',
                              CELLPHONE: '(32)98884-3542',
                              IS_WPP_CELL: false,
                              ACTIVE: false,
                         },
                         {
                              ID: 1,
                              NAME: 'Nikolas Calixto',
                              EMAIL: 'camposyan00@gmail.com',
                              CELLPHONE: '(32)98884-3542',
                              IS_WPP_CELL: false,
                              ACTIVE: true,
                         },
                         {
                              ID: 1,
                              NAME: 'Thiago Netto',
                              EMAIL: 'camposyan00@gmail.com',
                              CELLPHONE: '(32)98884-3542',
                              IS_WPP_CELL: true,
                              ACTIVE: false,
                         },
                         {
                              ID: 1,
                              NAME: 'Júlia Monteiro',
                              EMAIL: 'camposyan00@gmail.com',
                              CELLPHONE: '(32)98884-3542',
                              IS_WPP_CELL: true,
                              ACTIVE: true,
                         },
                    ]
               ))
          },
     })

     return {
          userRoutes
     }
}