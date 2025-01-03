import React, { ReactNode } from "react";

import Navbar from "@/components/navigation/navbar";

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default Rootlayout;
