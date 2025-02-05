'use client'

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import HobbyCard from "@/ui/HobbyCard";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const [hobbies, setHobbies] = React.useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const hobbyNameRef = React.useRef<HTMLInputElement>(null);

  const addHobby = () => {
    if (hobbyNameRef.current !== null)
      setHobbies((prev) => [...prev, hobbyNameRef.current!.value]);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {
          isFormOpen && (
            <div className={styles.form}>
              <input type="text" placeholder="Hobby name" ref={hobbyNameRef} />
              <Button onClick={addHobby}>Add</Button>
            </div>
          )
        }
        <Button onClick={e => setIsFormOpen(!isFormOpen)}>Create new hobby</Button>
        {
          hobbies.map((hobby, index) => (
            <HobbyCard key={index} name={hobby} />
          ))
        }
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
