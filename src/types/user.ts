export type RawUser = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    date: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
};

export type User = {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  country: string;
  thumbnail: string;
};
