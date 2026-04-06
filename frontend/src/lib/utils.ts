const estimateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/<[^>]*>/g, "");

  const words = cleanContent.trim().split(/\s+/).length;

  const readingTime = Math.ceil(words / wordsPerMinute);

  return readingTime;
};

const convertDate = (date: string) => {
  const currentDate = new Date(date);
  const formatDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatDate;
};
export { estimateReadingTime, convertDate };
