
import https from "https";
import { URL } from "url";

const target = process.env.TARGET_URL || "https://github.com/Varun-Debuggg/Varun-Debuggg";

function ping(url) {
  const u = new URL(url);
  const options = {
    hostname: u.hostname,
    path: u.pathname + u.search,
    method: "GET",
    headers: {
    
      "User-Agent": "RenderCron/1.0",
      "Accept": "*/*",
      "Connection": "close"
    }
  };

  const req = https.request(options, (res) => {
    console.log(`GET ${url} -> ${res.statusCode}`);
  
    res.on("data", () => {});
    res.on("end", () => process.exit(res.statusCode >= 400 ? 1 : 0));
  });

  req.on("error", (err) => {
    console.error("Request failed:", err.message);
    process.exit(1);
  });

  req.end();
}

ping(target);
