export interface Content {
  id: number;
  title: string;
  description: string;
  category: "film" | "serija";
  averageRating: number;
}

export const API_URL = "http://localhost:5000/api/content";

export async function getAllContent(
  sortBy: "title" | "averageRating" = "title",
  order: "asc" | "desc" = "asc",
  category: "all" | "film" | "serija" = "all"
): Promise<Content[]> {
  const params = new URLSearchParams({ sortBy, order, category });
  const res = await fetch(`${API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Greška pri dohvatanju sadržaja");
  const data: Content[] = await res.json();
  return data;
}

export async function rateContent(contentId: number, userId: number, ratingValue: number): Promise<void> {
  const res = await fetch(`${API_URL}/${contentId}/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ratingValue, userId }),
  });
  if (!res.ok) throw new Error("Greška pri slanju ocene");
}
