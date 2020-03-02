export interface Character {
    id: number;
  name: string;
  status: boolean;
  species: string;
  gender: string;
  location: { name: string; url: string; };
  origin: { name: string; url: string; };
}
