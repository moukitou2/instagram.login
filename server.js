const http = require('http');

// Changement pour le port 8080 (Évite les conflits système Windows)
const PORT = 8080;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);
                
                // C'est ici que vos saisies vont s'afficher !
                console.log("\n[SERVEUR BACKEND] ==============================");
                console.log(`[+] Requête HTTP POST interceptée avec succès.`);
                console.log(`[+] Identifiant reçu : ${parsedData.username}`);
                console.log(`[+] Mot de passe reçu : ${parsedData.password}`);
                console.log("[==============================================]\n");

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "success", message: "Flux traité localement." }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "error", message: "Flux mal formé." }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Ressource non trouvée.");
    }
});

server.listen(PORT, () => {
    console.log("\n\x1b[32m[INFO] Laboratoire actif sur http://localhost:8080\x1b[0m");
    console.log("[INFO] En attente de requêtes sur le port 8080...\n");
});
