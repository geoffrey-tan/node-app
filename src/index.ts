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
    var session = require("express-session");
    const bodyParser = require("body-parser");
    var path = require("path");

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: "@#$#@!", resave: false,
        saveUninitialized: true,
    }));

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

    app.post("/pinned", async (req: Request, res: Response) => {
        let post = {
            id: req.body.id,
        };

        if (post.id > 0) {
            session.pinned = session.pinned.push(post.id);
    
            res.redirect("index");
        } else {
            res.redirect('index');
        }
    });

    app.post("/", async (req: Request, res: Response) => {
        let post = {
            search: req.body.search,
            category: req.body.category
        };

        if (post.category != "Alles") {
            var data = await articlesRepository
            .createQueryBuilder("article")
            .where("article.title like :title", {title: '%' + post.search + '%' })
            .andWhere("article.category = :category", { category: post.category })
            .getMany();
        } else {
            var data = await articlesRepository
            .createQueryBuilder("article")
            .where("article.title like :title", {title: '%' + post.search + '%' })
            .getMany();
        }

        if (data.length > 0) {
            res.locals.articles = data;
            res.locals.category = data[0].category;
    
            res.render("index");
        } else {
            res.render('404');
        }
    });

    app.get("/artikel/:title", async (req: Request, res: Response) => {
        let title: string = req.params.title.replace(/_/g, " ");
        let articles = await articlesRepository.find({ where: { title: title }, relations: ["content_id"] });

        if (articles.length > 0 && articles[0].content_id.length > 0) {
            res.locals.h1 = title;
            res.locals.content = articles[0];
    
            res.render("artikel");
        } else {
            res.render('404');
        }

        session.pinned = true;
        console.log(session.pinned);
    });

    app.get('/*', (req: Request, res: Response) => {
        res.render('404');
    });
    
    /* -- Express server -- */
    app.listen(port, () => {
        console.log('App listening on port ' + port);
    });
});