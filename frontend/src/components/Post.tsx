import { PostType } from "@/interfaces/post.interface";
import { convertDate, estimateReadingTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Post = ({ data, dataAos }: { data: PostType; dataAos?: string }) => {
  return (
    <div className="w-235 bg-secondary-background" data-aos={dataAos}>
      {data.image && (
        <div className="w-full h-102.75">
          <Image
            src={data.image}
            alt="post"
            width={940}
            height={411}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="pt-7 pb-6.25 px-12 font-mono h-77.5 flex flex-col">
        <div className="text-xs mb-6">
          <span>{convertDate(data.create_at ?? "")}</span> •
          <span>{estimateReadingTime(data.content)} min read</span>
        </div>
        <Link
          href={`/blog/${data.slug}`}
          className="space-y-3 flex-1 mb-3 hover:[&_h2]:text-primary"
        >
          <h2 className="text-3xl font-bold font-sans line-clamp-2">
            {data.title}
          </h2>
          <div
            className="leading-6 text-sm line-clamp-2 [&_img]:hidden [&_p:empty]:hiddencd "
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Link>
        <div>
          <div className="h-px w-full bg-foreground" />
          <div className="flex gap-4 text-xs mt-4">
            <div>{data.view} views</div>
            <div>{data?.comment_count} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
