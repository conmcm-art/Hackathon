from http.server import BaseHTTPRequestHandler, HTTPServer
import json

from decision_worker import analyse_donation


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/health":
            self._send(200, {"status": "ok", "service": "food-bridge-python-decision-worker"})
        else:
            self._send(404, {"error": "Not found"})

    def do_POST(self):
        if self.path != "/api/analyse-donation":
            return self._send(404, {"error": "Not found"})
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return self._send(400, {"error": "Invalid JSON"})
        food, ngos = payload.get("food"), payload.get("ngos")
        if not isinstance(food, dict) or not isinstance(ngos, list) or not ngos:
            return self._send(400, {"error": "Request requires food object and ngos list"})
        self._send(200, analyse_donation(food, ngos))


if __name__ == "__main__":
    print("Food Bridge Python decision worker listening on http://localhost:8787")
    HTTPServer(("", 8787), Handler).serve_forever()
