import { useMutation, useQueryClient } from "@tanstack/react-query";

async function starEmail(emailId: string): Promise<void> {
  const res = await fetch("/api/gmail/star", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ emailId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to star email");
  }
}

export function useStarEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: starEmail,
    onSuccess: () => {
      // Invalidate and refetch recent emails after successful star
      queryClient.invalidateQueries({ queryKey: ["gmail", "recent"] });
    },
  });
}
