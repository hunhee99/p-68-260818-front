'use client';
export default function Posts() {
    const posts = [
    { id: 1, title: "글1" },
    { id: 2, title: "글2" },
    { id: 3, title: "글3" },
    { id: 4, title: "글4" },
    { id: 5, title: "글5" },
    { id: 6, title: "글6" },
    { id: 7, title: "글7" },
    { id: 8, title: "글8" },
    { id: 9, title: "글9" },
    { id: 10, title: "글10" },
  ];

  return <ul>
    {
        posts.map(p => <li key={p.id}>{p.title}</li>)
    }
    </ul>;
}