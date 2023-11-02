export interface User {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

export interface TableComponentProps {
    onEditUser?: (User: User) => void;
    openModal?: () => void;
}