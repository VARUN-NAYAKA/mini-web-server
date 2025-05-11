How to Run the Mini Web Server

Windows Setup Instructions

Prerequisites
1. Python 3.x installed on your computer
- You can download Python from [python.org](https://www.python.org/downloads/)
- During installation, make sure to check "Add Python to PATH"

### Step 1: Create a Project Folder
1. Create a new folder for your project (e.g., "mini_web_server")
2. Inside this folder, create a file named server.py
3. Copy the server code from the "Server Code" tab into this file
4. Create some HTML files to serve (at minimum, create an index.html file)

### Step 2: Run the Server
1. Open Command Prompt (cmd)
2. Navigate to your project folder using the cd command
``
cd path\to\your\mini_web_server
`
3. Run the server with Python
`
python server.py
`
4. You should see output indicating that the server has started:
`
[HH:MM:SS] Starting server on 127.0.0.1:8080
[HH:MM:SS] Server is listening on 127.0.0.1:8080
`

### Step 3: Connect to Your Server
1. Open a web browser
2. Navigate to http://localhost:8080 or http://127.0.0.1:8080
3. You should see your index.html page displayed

### Step 4: Stop the Server
1. To stop the server, press Ctrl+C` in the Command Prompt window

## Troubleshooting
- If you get "Address already in use" error, change the PORT value in the code
- If you get "Permission denied" errors, try running Command Prompt as administrator
- Make sure your HTML files are in the same directory as the server.py file

## Notes
- This is a simple server for educational purposes only
- It does not include security features required for production use
- The server serves files from the same directory where the script is located
