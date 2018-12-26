"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Content_1 = require("./Content");
var Pinned_1 = require("./Pinned");
var Articles = /** @class */ (function () {
    function Articles() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Articles.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Articles.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Articles.prototype, "category", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Content_1.Content; }, function (content) { return content.article_id; }),
        typeorm_1.JoinColumn({ name: "content_id" }),
        __metadata("design:type", Array)
    ], Articles.prototype, "content_id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Pinned_1.Pinned; }, function (pinned) { return pinned.article_id; }),
        __metadata("design:type", Pinned_1.Pinned)
    ], Articles.prototype, "pinned_id", void 0);
    Articles = __decorate([
        typeorm_1.Entity()
    ], Articles);
    return Articles;
}());
exports.Articles = Articles;
//# sourceMappingURL=Articles.js.map