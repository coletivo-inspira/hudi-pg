import type { PublicationRequest } from "@/domain/portfolio/types";

export type SubmissionResult =
  | { status: "queued"; requestId: string }
  | { status: "prepared"; requestId: string };

export async function submitPublicationRequest(
  request: PublicationRequest,
): Promise<SubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_HUDI_SUBMISSION_URL;

  if (!endpoint) {
    return {
      status: "prepared",
      requestId: `preview-${request.requestedSlug}-${Date.now()}`,
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar sua solicitação agora.");
  }

  const data = (await response.json()) as { requestId?: string };
  return {
    status: "queued",
    requestId: data.requestId ?? request.requestedSlug,
  };
}

