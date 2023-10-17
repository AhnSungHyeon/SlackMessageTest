import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [commitMessage, setCommitMessage] = useState();

  useEffect(() => {
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const fetchLatestCommit = async () => {
      const octokit = new Octokit({
        auth: githubToken,
      });

      try {
        const { data } = await octokit.request(
          "GET /repos/{owner}/{repo}/commits/{ref}",
          {
            owner: "AhnSungHyeon", // 저장소의 소유자 이름을 넣어주세요.
            repo: "SlackMessageTest", // 저장소의 이름을 넣어주세요.
            ref: "main", // 대상 브랜치 이름 (예: 'main' 또는 'master')
          }
        );
        console.log(data);
      } catch (error) {
        console.error("Error fetching commit:", error);
      }
    };

    fetchLatestCommit();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React 1</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
