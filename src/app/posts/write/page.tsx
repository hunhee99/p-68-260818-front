'use client';

import { fetchApi } from "@/lib/client";
import { useRouter } from "next/navigation";
import { ReactEventHandler } from "react";

export default function Write() {

    const router = useRouter();

    const onSubmitHandle = (e: any) => {
        e.preventDefault();

        const form = e.target;

        const titleValue = form.title.value;
        const contentValue = form.content.value;

        if(titleValue.length === 0) {
            alert("제목을 입력해주세요");
            form.title.focus();
            return;
        }

        if(contentValue.length === 0) {
            alert("내용을 입력해주세요");
            form.content.focus();
            return;
        }

        fetchApi("/api/v1/posts", {
            method: "POST",
            body: JSON.stringify({
                "title": titleValue,
                "content": contentValue
            })
        })
        .then(data => {
            alert(data.data.id);
            router.replace(`/posts/${data.data.id}`)
        });
    }

    return (
        <div>
            <h1>글 작성 페이지</h1>
            <form
                onSubmit={onSubmitHandle} 
                className="flex flex-col gap-4">
                <input 
                className="p-2 border-2 rounded"
                type="text" 
                name="title" 
                placeholder="제목을 입력해주세요"/>
                <textarea
                    className="p-2 border-2 rounded"
                    placeholder="내용을 입력해주세요"
                    name="content"
                ></textarea>
                <input className="p-2 border-2 rounded" type="submit" value="등록"/>
            </form>
        </div>
    );
}