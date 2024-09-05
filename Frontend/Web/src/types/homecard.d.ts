export default interface Homecards {
    id: string;
    title: string;
    logo: string;
    color: string;
    isBorder: boolean;
    isShadow: boolean;
    link: string;
    position: number;
    onClick: () => void;
    }