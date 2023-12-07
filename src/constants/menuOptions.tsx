import { Barbell, Calendar, House, User, UserCircle, UserCircleGear } from "@phosphor-icons/react"
import { MenuOptionsType, MobileMenuOptionsType } from "../types/menuOptions";

export const menuOptions: MenuOptionsType[] = [
     {
          icon: <House size={30} />,
          text: 'Início',
          link: '/dashboard',
          type: 'all'
     },
     {
          icon: <UserCircle size={30} />,
          text: 'Usuários',
          link: '/users',
          type: 'admin'
     },
     {
          icon: <Barbell size={30} />,
          text: 'Treinos',
          link: '/exercises',
          type: 'admin'
     },
     {
          icon: <UserCircleGear size={30} />,
          text: 'Perfil',
          link: '/profile',
          type: 'user'
     },
];

export const mobileMenuOptions: MobileMenuOptionsType[] = [
     {
          icon: <House size={30} />,
          link: '/dashboard',
          type: 'all'
     },
     {
          icon: <UserCircleGear size={30} />,
          link: '/profile',
          type: 'user'
     },
     {
          icon: <Calendar size={30} />,
          link: '/calendar',
          type: 'user'
     },
];