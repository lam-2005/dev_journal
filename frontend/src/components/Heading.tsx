import React, { ReactNode } from "react";
type Props = {
  dataAos?: string;
  className?: string;
  children: string | ReactNode;
};
const Heading = ({ dataAos, className, children }: Props) => {
  return (
    <div
      className={`bg-primary w-200 h-40 relative ${className}`}
      data-aos={dataAos}
    >
      <h1 className="container text-5xl absolute -translate-y-1/2 font-light">
        {children}
      </h1>
    </div>
  );
};

export default Heading;
