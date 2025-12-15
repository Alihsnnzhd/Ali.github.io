export interface Translation {
  nav: {
    brand: string;
    home: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    title: string;
    roles: string[];
    description: string;
    stats: {
      experience: string;
      projects: string;
    };
    cta: string;
  };
  experience: {
    title: string;
    items: {
      date: string;
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  projects: {
    title: string;
    items: {
      title: string;
      description: string;
      tags: string[];
      link: string;
      codeSnippet?: {
        file: string;
        code: string;
      };
    }[];
  };
  skills: {
    title: string;
    categories: {
      mobile: string;
      web: string;
      programming: string;
    };
  };
  footer: {
    text: string;
  };
}

export type Language = 'fa' | 'en';
