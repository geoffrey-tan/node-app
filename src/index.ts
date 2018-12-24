import "reflect-metadata";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Pinned} from "./entity/Pinned";

let port = process.env.PORT;

if (port == null || port == "") { // Changes port to 8000 when opened locally
    port = "8000";
}

/* -- TypeORM Connection -- */
createConnection().then(connection => {
    const userRepository = connection.getRepository(User);
    const app = express();
    app.use(bodyParser.json());
    
    /* -- Routes -- */
    app.get("/", async (req: Request, res: Response) => {
        res.send("Hello World!");
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