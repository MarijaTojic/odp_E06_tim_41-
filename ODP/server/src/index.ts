import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- In-memory baza ---
interface Content {
  id: number;
  title: string;
  description: string;
  category: "film" | "serija";
  averageRating: number;
  ratings: number[];
}

const contents: Content[] = [
  { id: 1, title: "Inception", description: "Sci-fi film", category: "film", averageRating: 9, ratings: [9] },
  { id: 2, title: "Stranger Things", description: "Serija", category: "serija", averageRating: 8, ratings: [8] },
  { id: 3, title: "Interstellar", description: "Sci-fi film", category: "film", averageRating: 9, ratings: [9] },
];

// --- GET svi sadržaji sa filterom i sortiranjem ---
app.get("/api/content", (req, res) => {
  const { category = "all", sortBy = "title", order = "asc" } = req.query;

  let filtered = contents;

  if (category !== "all") {
    filtered = filtered.filter(c => c.category === category);
  }

  filtered.sort((a, b) => {
    let valA: any = a[sortBy as keyof Content];
    let valB: any = b[sortBy as keyof Content];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  res.json(filtered);
});

// --- POST ocena ---
app.post("/api/content/:id/rate", (req, res) => {
  const contentId = Number(req.params.id);
  const { ratingValue, userId } = req.body;

  if (!ratingValue || ratingValue < 1 || ratingValue > 10) {
    return res.status(400).json({ message: "Nevažeća ocena" });
  }

  const content = contents.find(c => c.id === contentId);
  if (!content) return res.status(404).json({ message: "Sadržaj nije pronađen" });

  content.ratings.push(ratingValue);
  content.averageRating = content.ratings.reduce((a, b) => a + b, 0) / content.ratings.length;

  res.json({ message: "Ocena je uspešno sačuvana", averageRating: content.averageRating });
});

app.listen(PORT, () => {
  console.log(`🚀 Server radi na http://localhost:${PORT}`);
});
