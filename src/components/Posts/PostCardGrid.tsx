import PostCard from "./PostCard"

export default function PostCardGrid({posts}) {

    return (
        <div className="">
            {posts.map(post => (
                <PostCard 
                    key = {post.id}
                    post = {post}
                />
            ))}
        </div>
    )
}