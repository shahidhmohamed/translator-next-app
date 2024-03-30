import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(request: Request) {
    const { text } = await request.json();

    const command = `virenv\\Scripts\\Activate && python translate.py "${text}"`;

    const translatedTextPromise = new Promise((resolve, reject) => {
        exec(
            command,
            { shell: "cmd.exe" },
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                }
                resolve(stdout);
            }
        );
    });

    const translatedText = await translatedTextPromise;
    return NextResponse.json({ translatedText });
}
