type TSidebarItem = {
    title: string,
    state: "convert" | "history",
    Icon: React.ForwardRefExoticComponent<any>
    ref: React.RefObject<any>
}