export { }

declare global {
    enum Lang {
        EN = "en",
        ZH = "zh",
    }

    interface User {
        name: string;
        email: string;
        imageUrl: string;
    }

    interface Navigation {
        key: string;
        name: string;
        href: string;
        icon?:any;
        current?: boolean;
    }

    interface UserNavigation{
        key:string;
        name: string;
        href: string;
    }


    enum IconType {
        outline = 'outline',
        solid = 'solid',
    }

    interface DynamicIconProps {
        icon: string;
        type?: IconType;
        className?: string;
    }
}