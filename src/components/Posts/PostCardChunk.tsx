import PostCard from "./PostCard"
import { IPost } from "@/@types"

export default function PostCardChunk({posts}: {posts: IPost[]}) {

    return (
        <div className="mx-4 grid gap-3 mb-2">
            {posts.map(post => (
                <PostCard 
                    key = {post.id}
                    post = {post}
                />
            ))}
        </div>
    )
}