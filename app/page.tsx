import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function RootPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Redirect to default locale
  redirect("/en");
}
