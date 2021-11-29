"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchContents = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var path_2 = __importDefault(require("../utils/path"));
var getFile = function (fileName) {
    var filePath = path_1.default.join(path_2.default, "data", "API", fileName);
    return JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
};
var fetchContents = function (req, res, next) {
    var pageNo = req.params.pageNo;
    var q = req.query.q;
    var data = getFile("CONTENTLISTINGPAGE-PAGE" + pageNo + ".json");
    res.status(200).json({ message: { data: data, pageNo: pageNo, q: q } });
};
exports.fetchContents = fetchContents;
