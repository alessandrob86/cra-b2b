
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PORT = 3001;
const DB_FILE = join(process.cwd(), 'emails.json');

const server = createServer(async (req, res) => {
    // CORS headers for local dev
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/api/save-email') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { email } = JSON.parse(body);

                if (!email) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Email required' }));
                    return;
                }

                let emails = [];
                try {
                    const content = await readFile(DB_FILE, 'utf-8');
                    emails = JSON.parse(content);
                } catch (e) {
                    // File doesn't exist yet, start empty
                }

                const newEntry = {
                    email,
                    timestamp: new Date().toISOString()
                };

                emails.push(newEntry);
                await writeFile(DB_FILE, JSON.stringify(emails, null, 2));

                console.log(`[Saved] ${email} at ${newEntry.timestamp}`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Simple Email Server listening on http://localhost:${PORT}`);
});
