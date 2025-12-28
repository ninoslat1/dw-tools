type TSidebarItem = {
    title: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    state: "convert" | "history"
}