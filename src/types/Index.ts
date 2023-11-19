/* eslint-disable */

export type ProjectStatus =
    "In Progress" |
    "Pending Review" |
    "Active" |
    "Canceled" |
    "Finished";

export type RoleType =
    "Admin" |
    "User" |
    "Organization";

export interface UserType {
    id: string;
    name: string;
    email: string;
    password?: string;
    role?: RoleType
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    bio?: string;
    image?: string;
    projects?: Array<ProjectType>;
    donations?: Array<DonationType>;
}

export interface DonationType {
    id: string;
    description: string;
    amount: number;
    date: Date;
    user: UserType;
}

export interface ProjectType {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    date?: Date;
    location?: string;
    amount?: number;
    people?: number;
    image?: string;
    video?: string;
    link?: string;
    social_link?: string;
    donation?: Array<DonationType>;
    user: UserType;
}
