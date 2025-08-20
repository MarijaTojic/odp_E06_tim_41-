import express from "express";
import  sequelize  from "./Database/db";
import { User } from "./Domain/User";
import { Content } from "./Domain/Content";
import { Rating } from "./Domain/Rating";
import { Trivia } from "./Domain/Trivia";

import { userRouter } from "./WEBApi/userController";
import { contentRouter } from "./WEBApi/contentController";
import { triviaRouter } from "./WEBApi/triviaController";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contents", contentRouter);
app.use("/api/trivia", triviaRouter);

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync({ force: true }); // kreira tabele
    console.log("✅ Baza sinhronizovana");

    // Seed podaci
    const admin = await User.create({ username: "admin", password: "admin123", role: "admin" });
    const user = await User.create({ username: "marko", password: "pass123", role: "user" });

    const inception = await Content.create({ title: "Inception", type: "movie" });
    const breaking = await Content.create({ title: "Breaking Bad", type: "series" });

    await Rating.create({ userId: user.id, contentId: inception.id, ratingValue: 5 });
    await Trivia.create({ contentId: inception.id, triviaText: "Christopher Nolan je pisao scenario 10 godina." });

    app.listen(PORT, () => {
      console.log(`🚀 Server radi na http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Greška prilikom pokretanja servera:", err);
  }
}

startServer();
