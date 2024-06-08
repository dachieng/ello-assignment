import React from "react";

import Books from "../modules/books";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <>
      <Books />
    </>
  );
};

export default HomePage;
