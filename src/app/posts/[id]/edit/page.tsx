'use client';

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
    
    const router = useRouter();
    const {id} = useParams();
    const [post, setPost] = useState<PostDto | null>(null);

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`)
            .then(setPost);
    }, []);


    // 글 수정
    const onSubmitHandle = (e: any) => {
        e.preventDefault();

        const form = e.target;
        const titleValue = form.title.value;
        const contentValue = form.content.value;

        if(titleValue.length === 0){
            alert("제목을 입력해주세요")
            form.title.focus();
            return;
        }
        if(contentValue.length === 0){
            alert("내용을 입력해주세요")
            form.content.focus();
            return;
        }

        fetchApi(`/api/v1/posts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "title": titleValue,
                "content": contentValue
            })
        })
        .then(data => {
            alert(data.msg);
            router.replace(`/posts/${id}`);
        });
    }





    if(post === null){
        return <div>로딩중...</div>
    }
    
    return <div>
        <h1>글 수정 페이지</h1>
        <form
            onSubmit={onSubmitHandle}
            className="flex flex-col gap-4"
        >

            <input 
                className="p-2 border-2 rounded"
                type="text"
                name="title"
                defaultValue={post.title}
            />

            <textarea
                className="p-2 border-2 rounded"
                name="content"
                defaultValue={post.content}
            ></textarea>

            <input 
            className="p-2 border-2 rounded" 
            type="submit" 
            value="등록"
            />

        </form>
        </div>;
}