"use client";
import { useEffect, useState } from "react";
export default function CountUp({ max }: { max: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(max / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= max) {
        setCount(max);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [max]);
  return <span>{count}</span>;
}
