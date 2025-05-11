
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the log structure
interface Log {
  type: "info" | "error" | "success" | "request";
  message: string;
  timestamp: string;
}

// Define the server file structure
interface ServerFile {
  name: string;
  content: string;
}

// Define the context value type
interface ServerContextType {
  isRunning: boolean;
  serverPort: number;
  logs: Log[];
  files: ServerFile[];
  startServer: () => void;
  stopServer: () => void;
  addLog: (log: Omit<Log, "timestamp">) => void;
  clearLogs: () => void;
  setServerPort: (port: number) => void;
  addFile: (file: ServerFile) => void;
  deleteFile: (fileName: string) => void;
}

// Create the context with a default value
const ServerContext = createContext<ServerContextType>({
  isRunning: false,
  serverPort: 8080,
  logs: [],
  files: [],
  startServer: () => {},
  stopServer: () => {},
  addLog: () => {},
  clearLogs: () => {},
  setServerPort: () => {},
  addFile: () => {},
  deleteFile: () => {},
});

// Provider component
export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [serverPort, setServerPort] = useState(8080);
  const [logs, setLogs] = useState<Log[]>([]);
  const [files, setFiles] = useState<ServerFile[]>([
    {
      name: "index.html",
      content: `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Mini Web Server</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #0066cc; }
        .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Mini Web Server!</h1>
        <p>This is a simple HTTP server implemented with Python socket programming.</p>
        <p>It demonstrates basic concepts of web servers and network communication.</p>
        <hr>
        <p><strong>Server Status:</strong> Running</p>
        <p><em>Created for educational purposes</em></p>
    </div>
</body>
</html>`
    },
    {
      name: "about.html",
      content: `<!DOCTYPE html>
<html>
<head>
    <title>About Mini Web Server</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #0066cc; }
        .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>About This Project</h1>
        <p>The Mini Web Server is a simple HTTP server implemented with Python socket programming.</p>
        <p>Features include:</p>
        <ul>
            <li>Static HTML file serving</li>
            <li>Basic HTTP request handling</li>
            <li>Error handling (404 Not Found)</li>
            <li>Multi-threaded client handling</li>
        </ul>
        <p><a href="index.html">Back to Home</a></p>
    </div>
</body>
</html>`
    }
  ]);

  // Function to start the server
  const startServer = () => {
    const timestamp = new Date().toLocaleTimeString();
    setIsRunning(true);
    addLog({ type: "success", message: `Server started on port ${serverPort}` });
    
    // Simulate updating the preview iframe
    setTimeout(() => {
      const iframe = document.getElementById("preview-frame") as HTMLIFrameElement;
      if (iframe) {
        const defaultHtml = files.find(f => f.name === "index.html")?.content || "<h1>No index.html file found</h1>";
        iframe.srcdoc = defaultHtml;
      }
    }, 500);
  };

  // Function to stop the server
  const stopServer = () => {
    setIsRunning(false);
    addLog({ type: "info", message: "Server stopped" });
    
    // Clear the preview iframe
    const iframe = document.getElementById("preview-frame") as HTMLIFrameElement;
    if (iframe) {
      iframe.srcdoc = `<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#666;font-family:sans-serif;">
        <div style="text-align:center;">
          <h2>Server is not running</h2>
          <p>Start the server to see the preview</p>
        </div>
      </div>`;
    }
  };

  // Function to add a log entry
  const addLog = (log: Omit<Log, "timestamp">) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [...prevLogs, { ...log, timestamp }]);
  };

  // Function to clear all logs
  const clearLogs = () => {
    setLogs([]);
  };

  // Function to add a new file
  const addFile = (file: ServerFile) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    addLog({ type: "info", message: `File ${file.name} created` });
    
    // If the server is running and this is index.html, update the preview
    if (isRunning && file.name === "index.html") {
      const iframe = document.getElementById("preview-frame") as HTMLIFrameElement;
      if (iframe) {
        iframe.srcdoc = file.content;
      }
    }
  };

  // Function to delete a file
  const deleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    addLog({ type: "info", message: `File ${fileName} deleted` });
  };

  // Create the value object to be provided by the context
  const value: ServerContextType = {
    isRunning,
    serverPort,
    logs,
    files,
    startServer,
    stopServer,
    addLog,
    clearLogs,
    setServerPort,
    addFile,
    deleteFile,
  };

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

// Custom hook for using the context
export const useServer = () => {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error("useServer must be used within a ServerProvider");
  }
  return context;
};
