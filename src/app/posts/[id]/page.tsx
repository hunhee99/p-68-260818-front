'use client';

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Detail() {
    const router = useRouter();
    
    const {id} = useParams();
    const [post, setPost] = useState<PostDto | null>(null);

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`)
        .then(setPost)
    }, []);

    const deletePost = (id: number) => {
        fetchApi(`/api/v1/posts/${id}`,
            {method: "DELETE",
            }).then((data) => {
                alert(data.msg);
                router.replace("/posts");
                router.refresh();
                // document.location = "/posts";
            })
    };


    if(post === null){
        return <div>로딩중...</div>
    }

    return (
        <>
        <div>
            <h1>상세 페이지</h1>
            <div>번호 : {post.id}</div>
            <div>제목 : {post.title}</div>
            <div>내용 : {post.content}</div>
        </div>

        <div>
            <button 
            className="border-2 p-2 rounded"
            onClick={() => {
                deletePost(post.id);
            }}
            >
                삭제
            </button>
        </div>
        </>
    )
}


