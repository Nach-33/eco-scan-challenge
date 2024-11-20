// import { pipeline } from "@xenova/transformers";
// import { createRequire } from 'module';
// const modifiedRequire = createRequire(import.meta.url);
const asyncHandler = require("../middlewares/asyncHandler");

class MyClassificationPipeline {
    static task = "image-classification";
    static model = "Xenova/vit-base-patch16-224";
    static instance = null;

    static async getInstance() {
        if (this.instance === null) {
            let { pipeline, env } = await import("@xenova/transformers");

            this.instance = pipeline(this.task, this.model);
        }

        return this.instance;
    }
}

exports.classifyImage = asyncHandler(async (image) => {
    const matchWith = [
        {
            item: "shirt",
            score: 5,
        },
        {
            item: "jean",
            score: 10,
        },
        {
            item: "shoe",
            score: 15,
        },
        {
            item: "coat",
            score: 20,
        },
    ];

    // const index = Math.floor(Math.random() * (matchWith.length + 1));
    // const match =
    //     index < matchWith.length
    //         ? matchWith[index]
    //         : { item: "No Such Item", score: 0 };

    // return match;

    const pipe = await MyClassificationPipeline.getInstance();

    const result = await pipe(image, { topk: 15 });

    let combined = result.map((x) => {
        return x.label;
    });

    let processed = [];
    combined.forEach((x) => {
        x.split(", ").forEach((y) => {
            y.split(" ").forEach((z) => {
                processed = [...processed, z.toLowerCase()];
            });
        });
    });

    let match = null;
    for (let i = 0; i < processed.length; i++) {
        let found = false;

        matchWith.forEach((x) => {
            if (x.item === processed[i]) {
                found = true;
                match = x;
            }
        });

        if (found === true) break;
    }

    return match ? match : { item: "No Such Item", score: 0 };
});
