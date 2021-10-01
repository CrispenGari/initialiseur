const  express= require("express") ;

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    name: "backend",
    language: "typescript",
    message: "hello world!",
  });
});

export default router;
