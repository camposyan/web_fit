export interface MenuOptionsType {
     text: string,
     icon?: JSX.Element,
     link?: string,
     onClick?: () => void,
     type: 'admin' | 'user' | 'all'
}

export interface MobileMenuOptionsType {
     icon: JSX.Element,
     link: string,
     type: 'admin' | 'user' | 'all'
}