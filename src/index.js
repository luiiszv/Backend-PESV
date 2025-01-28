import app from "./app.js";
import { connectDb } from "./database/db.js";




connectDb();


app.listen(app.get("port"), () => {
    console.log(`Server on port`, app.get("port"))
});








