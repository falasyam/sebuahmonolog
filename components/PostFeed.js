import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => <PostItem post={post} admin={admin} />)
    : null;
}

function PostItem({ post, admin = false }) {
  return (
    <div className="relative border border-gray-400 bg-white rounded-b">
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div class="mb-3">
          <p class="text-black text-base">{post.isi}</p>
        </div>
        <div>
          <span
            className="
                    inline-block
                    bg-gray-200
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-gray-700
                    mr-2
                  "
          >
            #kaummonolog
          </span>
        </div>
      </div>
    </div>
  );
}
