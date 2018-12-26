"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var typeorm_1 = require("typeorm");
var Users_1 = require("./entity/Users");
var Pinned_1 = require("./entity/Pinned");
var Articles_1 = require("./entity/Articles");
var Content_1 = require("./entity/Content");
var port = process.env.PORT;
if (port == null || port == "") { // Changes port to 8000 when opened locally
    port = "8000";
}
/* -- TypeORM Connection -- */
typeorm_1.createConnection().then(function (connection) {
    var userRepository = connection.getRepository(Users_1.Users);
    var pinnedRepository = connection.getRepository(Pinned_1.Pinned);
    var articlesRepository = connection.getRepository(Articles_1.Articles);
    var contentRepository = connection.getRepository(Content_1.Content);
    var app = express();
    var bodyParser = require("body-parser");
    var session = require("express-session");
    var path = require("path");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: "@#$#@!", resave: false,
        saveUninitialized: true,
    }));
    /* -- EJS -- */
    app.set("views", path.join(__dirname, "../views/pages"));
    app.set("view engine", "ejs");
    // -- Index -- //
    app.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var articles, pinned;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, articlesRepository.find()];
                case 1:
                    articles = _a.sent();
                    return [4 /*yield*/, pinnedRepository.find({ where: { user_id: 1 } })];
                case 2:
                    pinned = _a.sent();
                    res.locals.articles = articles;
                    res.locals.pinned = pinned;
                    res.render("index");
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/pinned/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var params, articlesId, pinnedId, pinned, unpin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = req.params.id;
                    return [4 /*yield*/, articlesRepository.find({ where: { id: params } })];
                case 1:
                    articlesId = _a.sent();
                    return [4 /*yield*/, pinnedRepository.find({ where: { user_id: 1, article_id: params } })];
                case 2:
                    pinnedId = _a.sent();
                    if (!(articlesId.length > 0 && pinnedId.length < 1)) return [3 /*break*/, 4];
                    pinned = new Pinned_1.Pinned();
                    pinned.user_id = 1;
                    pinned.article_id = params;
                    return [4 /*yield*/, pinnedRepository.save(pinned)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, pinnedRepository.findOne({ where: { user_id: 1, article_id: params } })];
                case 5:
                    unpin = _a.sent();
                    return [4 /*yield*/, pinnedRepository.remove(unpin)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    res.redirect("../../");
                    return [2 /*return*/];
            }
        });
    }); });
    // -- Search & Filter -- //
    app.post("/zoeken", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var post, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post = {
                        search: req.body.search,
                        category: req.body.category
                    };
                    if (!(post.category != "Alles")) return [3 /*break*/, 2];
                    return [4 /*yield*/, articlesRepository
                            .createQueryBuilder("article")
                            .where("article.title like :title", { title: '%' + post.search + '%' })
                            .andWhere("article.category = :category", { category: post.category })
                            .getMany()];
                case 1:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, articlesRepository
                        .createQueryBuilder("article")
                        .where("article.title like :title", { title: '%' + post.search + '%' })
                        .getMany()];
                case 3:
                    data = _a.sent();
                    _a.label = 4;
                case 4:
                    if (data.length > 0) {
                        res.locals.articles = data;
                        res.locals.category = data[0].category;
                        res.render("index");
                    }
                    else {
                        res.render('404');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    // -- Article -- //
    app.get("/artikel/:title", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var title, articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = req.params.title.replace(/_/g, " ");
                    return [4 /*yield*/, articlesRepository.find({ where: { title: title }, relations: ["content_id"] })];
                case 1:
                    articles = _a.sent();
                    if (articles.length > 0 && articles[0].content_id.length > 0) {
                        res.locals.h1 = title;
                        res.locals.content = articles[0];
                        res.render("article");
                    }
                    else {
                        res.render('404');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    // -- 404 -- //
    app.get('/*', function (req, res) {
        res.render('404');
    });
    /* -- Express server -- */
    app.listen(port, function () {
        console.log('App listening on port ' + port);
    });
}).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map