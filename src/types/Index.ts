export type ProjectStatus =
  | 'In Progress'
  | 'Pending Review'
  | 'Active'
  | 'Canceled'
  | 'Finished';

export type RoleType = 'Admin' | 'User' | 'Organization';

export interface UserType {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: RoleType;
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
  date: string;
  user: UserType;
}

export interface CategoryType {
  id: string;
  name: string;
  description: string;
  projects?: Array<ProjectType>;
}

export interface ProjectType {
  id?: string;
  name: string;
  description: string;
  status: ProjectStatus;
  date?: string;
  location?: string;
  amount?: number;
  people?: number;
  image?: string;
  video?: string;
  link?: string;
  social_link?: string;
  donation?: Array<DonationType>;
  user: UserType;
  likes?: number;
  category: string;
  view_count?: number;
  list_images?: Array<string>;
  video_url: string;
  hasUpdated?: boolean;
  collect?: number | string;
  isBlocked?: boolean;
  is_emergency?: boolean;
}

export interface MessageType {
  id?: string;
  message?: string;
  date?: string;
  user?: UserType;
  project?: ProjectType;
}

export interface PaymentType {
  id: string;
  amount?: number;
  type?: string;
  date?: string;
  user?: UserType;
  project?: ProjectType;
}
