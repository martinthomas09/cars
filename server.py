#!/usr/bin/env python3
"""
REDLINE Supercar Showcase - Local Development Server
Launches a local HTTP server and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class RedlineHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Format clean telemetry log
        sys.stdout.write(f"[REDLINE 8000] {self.address_string()} - {format % args}\n")

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), RedlineHTTPHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(" 🏎️  REDLINE — THE ART OF SPEED")
        print(f" Live server operational at: {url}")
        print(" Press Ctrl+C to terminate.")
        print("=" * 60)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down REDLINE server.")

if __name__ == "__main__":
    run()
