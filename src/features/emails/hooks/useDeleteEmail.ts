import { useMutation, useQueryClient } from "@tanstack/react-query";

async function trashEmail(emailId: string): Promise<void> {
  const res = await fetch("/api/gmail/trash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ emailId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to move email to trash");
  }
}

export function useDeleteEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trashEmail,
    onSuccess: () => {
      // Invalidate and refetch recent emails after successful trash
      void queryClient.invalidateQueries({ queryKey: ["gmail", "recent"] });
    },
  });
}
