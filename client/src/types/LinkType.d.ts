type LinkT = {
  name: string;
  description: string;
  link: string;
};

type ApiResponseT = {
  message: string;
  link: LinkT;
  links: LinkT[];
};
