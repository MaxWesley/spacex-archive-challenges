export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    flickr: {
      original: string[];
    };
  };
  rocket: {
    name: string;
    type: string;
  };
  launchpad: {
    name: string;
    locality: string;
  };
};
