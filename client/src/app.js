import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Notes from "./components/notes";
import Goals from "./components/goals";
import Principles from "./components/principles";
import Layout from "./components/layout";
import NotFound from "./components/notFound";
import Page from "./objects/page";
import { TitleProvider } from "./context/title";

export default function App() {
  const pages = [
    // new Page("Notes", <Notes goals={goals} principles={principles}></Notes>),
    new Page("Goals", <Goals />),
    // new Page("Principles", <Principles />),
  ];

  const routes = (
    <Routes>
      {pages.map((page) => (
        <Route path={page.path} element={page.element} key={page.key} />
      ))}
      <Route path="/" element={<Navigate replace to="/goals" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <>
      <TitleProvider>
        <Layout pages={pages} content={routes} />
      </TitleProvider>
    </>
  );
}
