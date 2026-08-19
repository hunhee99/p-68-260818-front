'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface postDto {
    id : number; 
    title : string;
    content : string;
    createDate : string;
    modifyDate : string;
}

export default function Detail() {
    const {id} = useParams();
    const [post, setPost] = useState<postDto | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data);
        })
    }, []);

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


