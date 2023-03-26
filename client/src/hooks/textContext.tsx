import axios from "axios";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./localStorage";

export type TextMap = typeof defaultKeys & {
  [s: string]: {
    [s: string]: string;
  };
};

export const defaultKeys = {
  global: {
    shopname: "",
    backbutton: "",
  },
  header: {
    loginbutton: "",
    registerbutton: "",
    logoutbutton: "",
    welcometext: "",
    searchbutton: "",
  },
  homepage: {
    title: "",
    promo1title: "",
    promo1text: "",
    promo3title: "",
    promo3text: "",
    promo2title: "",
    promo2text: "",
    bestsellers: "",
  },
  footer: {
    copyright: "",
    slogan: "",
  },
  navdrawer: {
    category: "",
    usercart: "",
    adminuser: "",
    newproduct: "",
    adminproduct: "",
    admincategory: "",
    adminorder: "",
    reports: "",
    integrations: "",
    admintext: "",
  },
  categorypage: {
    title: "",
    instruction: "",
    notselected: "",
  },
  usercartpage: {
    title: "",
    noproducts: "",
    total: "",
    checkoutbutton: "",
  },
  adminuserpage: {
    title: "",
  },
  newproductpage: {
    title: "",
    createbutton: "",
  },
  adminproductpage: {
    title: "",
    detailscol: "",
  },
  admincategorypage: {
    title: "",
    deletecol: "",
  },
  adminorderpage: {
    title: "",
    detailscol: "",
  },
  reportpage: {
    title: "",
    report: "",
    fields: "",
    filters: "",
    addfilterbutton: "",
    sort: "",
    addsortbutton: "",
    generatebutton: "",
  },
  integrationpage: {
    name: "",
    username: "",
    password: "",
    url: "",
    savebutton: "",
  },
  admintextpage: {
    component: "",
    key: "",
    value: "",
  },
  searchpage: {
    title: "",
    categoryfilter: "",
    pricefilter: "",
  },
  user: {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  },
  order: {
    name: "",
    producttotal: "",
    since: "",
    till: "",
  },
  category: {
    name: "",
  },
  product: {
    name: "",
    description: "",
    brand: "",
    weight: "",
    price: "",
    category: "",
    pictureurl: "",
    quantity: "",
    technical: "",
    type: "",
    value: "",
  },
};

type StateType = TextMap | null;

const InternalContext = createContext<
  [
    StateType,
    (state: StateType | ((prevState: StateType) => StateType)) => void
  ]
>([{} as TextMap, () => {}]);

export function TextProvider({ children }: { children: React.ReactNode }) {
  const [storedValue, setStoredValue] = useLocalStorage<StateType>(
    "translationtexts",
    null
  );

  useEffect(() => {
    axios.get("/api/text").then((res) => {
      setStoredValue(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InternalContext.Provider
      value={useMemo(
        () => [storedValue, setStoredValue],
        [storedValue, setStoredValue]
      )}
    >
      {children}
    </InternalContext.Provider>
  );
}

export function useTexts(): TextMap {
  const [texts] = useContext(InternalContext);
  if (texts === null) {
    return new Proxy({} as TextMap, {
      has(target, component) {
        if (typeof component === "symbol")
          return Reflect.has(target, component);
        return true;
      },
      get(target, component, receiver) {
        if (typeof component === "symbol")
          return Reflect.get(target, component, receiver);
        return new Proxy(
          {},
          {
            get(target, key, receiver) {
              if (typeof key === "symbol")
                return Reflect.get(target, key, receiver);
              return "";
            },
          }
        );
      },
    });
  } else {
    return new Proxy(texts, {
      get(target, component, receiver) {
        if (typeof component === "symbol")
          return Reflect.get(target, component, receiver);
        const complw = component.toLowerCase();
        return new Proxy(target[complw] ?? {}, {
          get(target, key, receiver) {
            if (typeof key === "symbol")
              return Reflect.get(target, key, receiver);
            const keylw = key.toLowerCase();
            if (keylw in target) return Reflect.get(target, keylw, receiver);
            return `{${complw}.${keylw}}`;
          },
        });
      },
    });
  }
}
