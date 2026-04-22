interface PageProps {
    searchParams: {
      query?: string;
    };
  }

interface SearchProps {
  placeholder?: string;
  paramKey?: string; // key di URL, default "query"
}