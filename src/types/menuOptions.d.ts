export interface MenuOptionsType {
     text: string,
     icon?: JSX.Element,
     link?: string,
     closeSidebarAction?: () => void
}

export interface MobileMenuOptionsType {
     icon: JSX.Element,
     link: string,
     type: 'admin' | 'user' | 'all'
}