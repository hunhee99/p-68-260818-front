'use client';

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Detail() {
    const {id} = useParams();
    const [post, setPost] = useState<PostDto | null>(null);

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`)
        .then(setPost)

    }, []);

    const deletePost = (id: number) => {
        fetch(`${process.env.NEXT_}`)

    };

    if(post === null){
        return <div>로딩중...</div>
    }

    return (
        <div>
            <h1>상세 페이지</h1>
            <div>번호 : {post.id}</div>
            <div>제목 : {post.title}</div>
            <div>내용 : {post.content}</div>
        </div>
    )
}


