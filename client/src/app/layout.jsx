"use client";
import "./globals.css";

import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import NavDrawer from "../components/NavDrawer";
import { MdLogin, MdProductionQuantityLimits, MdTag, MdShoppingCart } from "react-icons/md";
import { TbReportAnalytics, TbPlugConnected } from 'react-icons/tb'
import { AiOutlineUserSwitch, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import Footer from "../components/Footer";
import { UserProvider } from "../hooks/userContext";

const navItems = [
  {
    name: "Categories",
    href: "/categories",
    icon: <MdTag />,
  },
  {
    name: "Carrito",
    href: "/user/cart",
    icon: <MdShoppingCart />,
    privileges: 1,
  },
  {
    name: "Login",
    href: "/auth/login",
    icon: <MdLogin size='1.5rem'/>,
  },
  {
    name: "Register",
    href: "/auth/register",
    icon: <MdLogin size='1.5rem'/>,
  },
  {
    name: "Users", 
    href: "/admin/users",
    icon: <AiOutlineUserSwitch size='1.5rem'/>,
    privileges: 2
  },
  {
    name: 'New Product', 
    href: '/admin/product/create', 
    icon: <AiOutlineAppstoreAdd size='1.5rem'/>,
    privileges: 2
  },
  {
    name: 'Category Administration',
    href: '/admin/category',
    icon: <BiCategory size='1.5rem'/>, 
    privileges: 2
  },
  {
    name: "Orders Administration", 
    href: '/admin/orders', 
    icon: <MdProductionQuantityLimits size='1.5rem'/>,
    privileges: 2
  },
  {
    name: 'Reports', 
    href: '/admin/reports', 
    icon: <TbReportAnalytics size='1.5rem'/>,
    privileges: 2
  },
  {
    name: 'Integrations', 
    href: '/admin/integrations', 
    icon: <TbPlugConnected size='1.5rem'/>,
    privileges: 2
  },
];

export default function Layout({ children }) {
  const [drawer, setDrawer] = useState(false);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <UserProvider>
              <CssBaseline />
              <NavBar onDrawer={() => setDrawer(true)} />
              <NavDrawer
                open={drawer}
                onClose={() => setDrawer(false)}
                items={navItems}
              />
              <Container className="mt-[6rem]" maxWidth="lg">
                {children}
              </Container>
              <Footer />
            </UserProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
