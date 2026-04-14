import React from "react";

const NoThumbnail = ({ dataAos }: { dataAos?: string }) => {
  return (
    <div
      className="w-full lg:w-[60%] h-80 lg:h-full relative z-10 overflow-hidden shadow-2xl"
      data-aos={dataAos}
    >
      <div className="w-full h-full bg-gradient-to-bl from-primary/20 via-foreground to-foreground flex flex-col items-center justify-center p-10">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h2 className="text-background/20 text-8xl font-black uppercase select-none leading-none text-center">
          No <br /> Preview
        </h2>
        <div className="z-10 text-center">
          <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase">
            DevJournal Featured
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoThumbnail;
