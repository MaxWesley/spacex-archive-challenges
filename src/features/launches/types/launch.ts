export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  flight_number?: number | null;
  details?: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    flickr: {
      original: string[];
    };
    webcast?: string | null;
    wikipedia?: string | null;
    article?: string | null;
  };
  rocket: {
    name: string;
    type: string;
  };
  launchpad: {
    name: string;
    locality: string;
  };
  crew?: Array<{
    role: string;
    crew: {
      name: string;
      agency?: string | null;
      image?: string | null;
      wikipedia?: string | null;
    };
  }>;
};
