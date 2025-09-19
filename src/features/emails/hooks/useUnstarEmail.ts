import { useMutation, useQueryClient } from "@tanstack/react-query";

async function unstarEmail(emailId: string): Promise<void> {
  const res = await fetch("/api/gmail/unstar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ emailId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to unstar email");
  }
}

export function useUnstarEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unstarEmail,
    onSuccess: () => {
      // Invalidate and refetch recent emails after successful unstar
      queryClient.invalidateQueries({ queryKey: ["gmail", "recent"] });
    },
  });
}
