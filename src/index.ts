import "reflect-metadata";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {Users} from "./entity/Users";
import {Pinned} from "./entity/Pinned";
import {Articles} from "./entity/Articles";
import {Content} from "./entity/Content";

let port = process.env.PORT;

if (port == null || port == "") { // Changes port to 8000 when opened locally
    port = "8000";
}

/* -- TypeORM Connection -- */
createConnection().then(connection => {
    const userRepository = connection.getRepository(Users);
    const pinnedRepository = connection.getRepository(Pinned);
    const articlesRepository = connection.getRepository(Articles);
    const contentRepository = connection.getRepository(Content);
    const app = express();
    var path = require("path");

    /* -- EJS -- */
    app.use(bodyParser.json());
    app.set("views", path.join(__dirname, "../views/pages"));
    app.set("view engine", "ejs");
    
    /* -- Routes -- */
    app.get("/", async (req: Request, res: Response) => {
        let articles = await articlesRepository.find();

        res.locals.articles = articles;

        res.render("index");
    });

    app.get("/artikel/:title", async (req: Request, res: Response) => {
        let params = req.params.title.replace(/_/g, " ");

        res.send("article");
    });

    app.get("/login", async (req: Request, res: Response) => {
        res.send("Login page");
    });

    app.post("/login", async (req: Request, res: Response) => {
        const user = userRepository.find(req.body);
    });
    
    app.get("/search/:search", async (req: Request, res: Response) => {
        res.send(req.params.search);
    });

    app.get('/*', (req: Request, res: Response) => {
        res.send('This page does not exists');
    });
    
    /* -- Express server -- */
    app.listen(port, () => {
        console.log('App listening on port ' + port);
    });
});