import PostCard from "./PostCard"
import { IPost } from "@/@types"

export default function PostCardChunk({posts}: {posts: IPost[]}) {

    return (
        <div className="mx-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
            {posts.map(post => (
                <PostCard 
                    key = {post.id}
                    post = {post}
                />
            ))}
        </div>
    )
}