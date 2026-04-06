const LoadingSkeletonPost = ({
  type = "small",
}: {
  type?: "large" | "small";
}) => {
  return type === "large" ? (
    <div className="w-235 bg-foreground/10 h-77.5 animate-pulse"></div>
  ) : (
    <div className="grid grid-cols-3 gap-8 justify-center mt-10 ">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="size-73 bg-foreground/10 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeletonPost;
