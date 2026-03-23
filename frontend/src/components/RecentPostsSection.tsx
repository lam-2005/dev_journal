import PostRecomented from "./PostRecomented";

const RecentPostsSection = () => {
  return (
    <section className="flex flex-col items-center gap-20">
      <h1 className="text-5xl font-light text-center">
        Recent <span className="font-extrabold">Blog</span> Posts
      </h1>
      <div className="grid grid-cols-[max-content_max-content_max-content] gap-8 justify-center ">
        <PostRecomented />
        <PostRecomented />
        <PostRecomented />
      </div>
      <button className="border border-foreground px-8 py-2 flex gap-2 items-center justify-center font-mono">
        See all
      </button>
    </section>
  );
};

export default RecentPostsSection;
