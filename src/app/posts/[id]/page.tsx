'use client';

import { fetchApi } from "@/lib/client";
import { PostCommentDto, PostDto } from "@/type/post";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Detail() {
    const router = useRouter();
    
    const {id} = useParams();
    const [post, setPost] = useState<PostDto | null>(null);
    const [postComments, setPostComments] = useState<PostCommentDto[]>([]);


    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`).then(setPost);
        fetchApi(`/api/v1/posts/${id}/comments`).then(setPostComments);
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
        <div className="flex gap-4 flex-col justify-center">
            <div className="border-2 p-2 rounded">
                <div>
                    <h1 className="p-2">글 상세 페이지</h1>
                    <div>번호 : {post.id}</div>
                    <div>제목 : {post.title}</div>
                    <div>내용 : {post.content}</div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Link className="border-1 p-1 rounded" href={`/posts/${post.id}/edit`}>
                        수정
                    </Link>
                    <button 
                    className="border-1 p-1 rounded"
                    onClick={() => {
                        deletePost(post.id);
                    }}
                    >
                        삭제
                    </button>
                </div>
                </div>
        
            {/* 댓글 목록 */}
            <div className="border-2 p-2 rounded">
            <h2 className="p-2">댓글 목록</h2>
            {postComments.length === 0 && <div>댓글이 없습니다.</div>}

            {postComments.length > 0 && (
                <ul>
                    {postComments.map((postComment) => (
                        <li key={postComment.id}>
                            {postComment.id} : {postComment.comment}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
        </>
    )
}


