"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.status(200).json({
        name: "backend",
        language: "typescript",
        message: "hello world!",
        programmer: "@programer",
        moto: "i'm a programer i have no life!"
    });
});
exports.default = router;
//# sourceMappingURL=router.js.map