import { Article, Barbell, Calendar, House, UserCircle, UserCircleGear } from "@phosphor-icons/react"
import { MenuOptionsType, MobileMenuOptionsType } from "../types/menuOptions";

export const menuOptions: MenuOptionsType[] = [
     {
          icon: <House size={30} />,
          text: 'Início',
          link: '/home',
     },
     {
          icon: <UserCircle size={30} />,
          text: 'Usuários',
          link: '/users',
     },
     {
          icon: <Barbell size={30} />,
          text: 'Exercícios',
          link: '/exercises',
     },
     {
          icon: <Article size={30} />,
          text: 'Fichas',
          link: '/sheets',
     },
];

export const mobileMenuOptions: MobileMenuOptionsType[] = [
     {
          icon: <House size={30} />,
          link: '/home',
          type: 'all'
     },
     {
          icon: <UserCircle size={30} />,
          link: '/users',
          type: 'admin'
     },
     {
          icon: <Barbell size={30} />,
          link: '/exercises',
          type: 'admin'
     },
];