export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

import type {
  PageContextBuiltIn,
  /*
      // When using Client Routing https://vite-plugin-ssr.com/clientRouting
      PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
      /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr";

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = {
  searchParams: Record<string, string>;
  params: Record<string, any>;
};

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
