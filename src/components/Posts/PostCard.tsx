import React from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import { useMutation } from '@tanstack/react-query';

export default function PostCard({ post }) {

    const createRequestMutation = useMutation({
        mutationFn: (request) => {
            return api.post('/api/requests/', {
                "sender_id": request.sender_id,
                "post_id": request.post_id
            })
        },
        onError: (error) => {
            setNotification("error", JSON.stringify(error.response.data))
        },
        onSuccess: () => {
            setNotification("success", "Sent Request.")
        }
    })

    return (
        <div className='bg-white rounded border-1 shadow px-3 py-3 w-full h-fit mb-2'>
            <div className='flex flex-rows'>
                <p className='text-lg font-semibold'>{post.ticket}</p>
                <p className='ml-auto'>@{post.author.username}</p>
            </div>
            <div>
                <p className=''>${post.ticket_price}</p>
            </div>
        </div>
        // <Box sx={{ minWidth: '90dvw', marginBottom: '10px', marginX: '10px'}}>
        //     <Card variant="outlined" sx={{ background: '' }}>
        //         <CardContent>
        //             <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        //                 @{post.author.username} {post.author.is_verified_uga && "(Verified)"}
        //             </Typography>
        //             <Typography variant="h5" component="div">
        //                 {post.ticket}
        //             </Typography>
        //             <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>${post.ticket_price}</Typography>
        //             <Divider />
        //         </CardContent>
        //         <CardActions>
        //             <Button onClick={() => {
        //                 createRequestMutation.mutate({
        //                     sender_id: post.author.id,
        //                     post_id: post.id,
        //                 })
        //             }} size="small">Send Request</Button>
        //         </CardActions>
        //     </Card>
        // </Box>
    )
}