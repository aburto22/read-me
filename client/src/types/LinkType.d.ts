type LinkT = {
  name: string;
  description: string;
  link: string;
};

type ApiResponse = {
  message: string;
  link: LinkT;
  links: LinkT[];
};
