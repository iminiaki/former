import { makeApp } from "./api";

const PORT = 3000;
const app = makeApp();
app.listen(PORT, () => {
    console.log("listening on Port" + PORT);
});
