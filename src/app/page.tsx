"use client";


import { fetchCourseMeetingTimes } from "./api/api";
import { useEffect, useState } from "react";

import { CourseSection } from "./api/api";

export default function Home() {
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String>("");

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const data = await fetchCourseMeetingTimes('CSCE', '412');
        setSections(data);
      } 
      catch (err) {
        setError('Failed to load course data');
      } 
      finally {
        setLoading(false);
      }
    };

    getCourseData();
  }, []);


  return (
    <div>
    </div>
  );
}
