import {Elysia} from "elysia"
import {cors} from "@elysiajs/cors"

const app = new Elysia();

app.use(cors())

app.get("/weapon", async () => {
    const file = Bun.file("weapon.json");
    return await file.json();
});

app.get("/helm", async () => {
    const file = Bun.file("helm.json");
    return await file.json();
});

app.get("/chest", async () => {
    const file = Bun.file("chest.json");
    return await file.json();
});

app.get("/gauntlet", async () => {
    const file = Bun.file("gauntlet.json");
    return await file.json();
});

app.get("/leg", async () => {
    const file = Bun.file("leg.json");
    return await file.json();
});

app.get("/class", async () => {
    const file = Bun.file("class.json");
    return await file.json();
});

app.listen(3000, () => {
    console.log("Elysia running on port 3000");
});