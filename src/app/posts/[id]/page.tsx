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

    const onSubmitHandle = (e: any) => {
        e.preventDefault();

        const form = e.target;
        const contentValue = form.content.value;

        if(contentValue.length === 0) {
            alert("내용을 입력해주세요");
            form.content.focus();
            return;
        }

        // 댓글 생성 핸들러
        fetchApi(`/api/v1/posts/${id}/comments/write`, {
            method: "POST",
            body: JSON.stringify({
                "content": contentValue
            })
        })
        .then((data) => {
            form.content.value = "";    // 입력창 비우기
            fetchApi(`/api/v1/posts/${id}/comments`).then(setPostComments); // 댓글 목록 재요청
        })
    }




    if(post === null){
        return <div>로딩중...</div>
    }

    return (
        <>
        <div className="flex gap-4 flex-col justify-center">
            
            {/* 글 목록 */}
            <div className="flex gap-3 flex-col border-2 p-2 rounded">
                <div>
                    <h1 className="p-2">글 상세 페이지</h1>
                    <div>번호 : {post.id}</div>
                    <div>제목 : {post.title}</div>
                    <div>내용 : {post.content}</div>
                </div>
                {/* 글 수정, 삭제 */}
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
            <div className="border-2 p-2 rounded flex gap-3 flex-col">
                <h2 className="p-2">댓글 목록</h2>
                {postComments.length === 0 && <div>댓글이 없습니다.</div>}

                {postComments.length > 0 && (
                    <ul>
                        {postComments.map((postComment) => (
                            <li key={postComment.id}>
                                {postComment.id} : {postComment.content}
                            </li>
                        ))}
                    </ul>
                )}

                {/* 댓글 생성 */}
                <div>
                    <form
                    onSubmit={onSubmitHandle}
                    className="flex"
                    >
                        <textarea
                            className="p-2 border-2 rounded"
                            placeholder="내용을 입력해주세요"
                            name="content"
                        ></textarea>
                        <input className="p-2 border-2 rounded" type="submit" value="등록"/>
                    </form>
                </div>
            </div>

        </div>
        </>
    )
}


