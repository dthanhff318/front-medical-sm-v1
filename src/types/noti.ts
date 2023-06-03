export type TNoti = {
  id?: number;
  notiFor?: string;
  status?: string;
  createdTime?: string;
  department?: {
    id?: number;
    name?: string;
  };
  ticket?: {
    id?: number;
    typePlan?: number;
  };
  seen?: boolean;
};
