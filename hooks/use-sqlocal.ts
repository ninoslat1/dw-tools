"use client"

import { useEffect, useState } from "react";

export function useSQLocal() {
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const { SQLocal } = await import("sqlocal");

      const sql = new SQLocal("dwimgconv.sqlite3");

      setDb(sql);
    }

    init();
  }, []);

  return db;
}
