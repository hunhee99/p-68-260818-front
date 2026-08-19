'use client';

import { fetchApi } from "@/src/lib/client";
import { PostDto } from "@/src/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState<PostDto[]>([]);

    // useEffect(() => {}, []);
    useEffect(() => {
        // fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`) // 디폴트가 get 요청
        // .then((res) => res.json())
        // .then((data) => {
        // setPosts(data);
        // })

        fetchApi("/api/v1/posts")
        .then(setPosts);
    }, []);
    

  return (
    <>
    {posts.length === 0
    ? <div>로딩중...</div>
    : <ul>
        {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
            <li>
                  {post.id} : {post.title}
            </li>
        </Link>
        ))}
    </ul>}
    </>
  );
}