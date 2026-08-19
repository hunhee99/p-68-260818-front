'use client';

import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPostes] = useState<{id: number; title: string}[]>([]);

    // useEffect(() => {}, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/posts') // 디폴트가 get 요청
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
        setPostes(data);
        })
    }, []);
    

  return (
    <>
    {posts.length === 0
    ? <div>로딩중...</div>
    : <ul>
        {posts.map((post) => 
        <li key={post.id}>
              {post.id} : {post.title}
        </li>
        )}
    </ul>}
    </>
  );
}