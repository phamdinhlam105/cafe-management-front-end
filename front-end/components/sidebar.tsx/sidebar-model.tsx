
export interface SidebarModel {
    title: string,
    url: string,
    icon: any,
    items?: {
        title: string,
        url: string
    }[]
}