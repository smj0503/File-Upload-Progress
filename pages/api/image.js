import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
    // next 에선 디폴트로 bodyParser 가 작동되므로 비활성화 해준다
    api: { bodyParser: false }
};

const readFile = (req, saveLocally) =>
{
    const options = {};

    /* saveLocally === true 일시 로컬에 저장 */
    if (saveLocally)
    {
        // option 객체에 path(uploadDir) 와 filename 을 저장
        options.uploadDir = path.join(process.cwd(), "/public/images");

        options.filename = (name, ext, path) =>
        {
            return path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;

    const form = formidable(options);

    return new Promise((resolve, reject) =>
    {
        form.parse(req, (err, fields, files) =>
        {
            if (err)
            {
                reject(err);
            }
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) =>
{
    // fs 모듈을 사용하여 path 에 폴더가 없을 땐 생성하도록 할 수 있도록
    try
    {
        await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    }
    catch (err)
    {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
    }
    await readFile(req, true);

    res.json({ done: "ok" });
};

export default handler;