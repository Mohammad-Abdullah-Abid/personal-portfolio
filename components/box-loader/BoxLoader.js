"use client";
import React from "react";
import AnimatedBox from "./AnimatedBox";
import CodeBackground from "./CodeBackground";
import "./BoxLoader.css";

// Array of short code snippets to display randomly
const codeSnippets = [
    `function animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n}`,
    `const data = await fetch('/api/users');\nconst json = await data.json();\nconsole.log(json);`,
    `useEffect(() => {\n  setLoading(true);\n  fetchData();\n  return () => clearTimeout(timer);\n}, []);`,
    `export default function App() {\n  return (\n    <Main component={<Home />} />\n  );\n}`,
    `const calculateTotal = (items) => {\n  return items.reduce((sum, item) => \n    sum + item.price, 0);\n};`,
    `router.get('/profile/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.json(user);\n});`,
    `class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}`,
    `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n}`,
    `async function loadUsers() {\n  try {\n    const data = await fetchUsers();\n    setUsers(data);\n  } catch (err) {}\n}`,
    `const styles = {\n  container: { display: 'flex' },\n  header: { fontSize: '24px' },\n  button: { padding: '8px' }\n};`,
];

const BoxLoader = ({
    firstText = { left: "PERSONAL", right: "PORTFOLIO" },
    secondText = { left: "MOHAMMAD", right: "ABDULLAH" },
    timings = {
        firstTextAppear: 1800,
        firstTextHide: 4000,
        secondTextAppear: 5000,
        secondTextHide: 7000,
        boxOut: 8000,
        lineOut: 9000,
        dotOut: 9500,
    },
}) => {
    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black w-full h-24 min-h-screen flex justify-center items-center font-bold bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
            <CodeBackground
                snippets={codeSnippets}
                maxSnippets={10}
                interval={800}
                initialBatch={5}
            />
            <AnimatedBox
                firstText={firstText}
                secondText={secondText}
                timings={timings}
            />
        </div>
    );
};

export default BoxLoader;
