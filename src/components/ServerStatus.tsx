
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useServer } from "@/context/ServerContext";
import { toast } from "sonner";

const ServerStatus = () => {
  const { isRunning, startServer, stopServer, serverPort, setServerPort } = useServer();
  const [portInput, setPortInput] = useState("8080");

  const handleStartServer = () => {
    const port = parseInt(portInput);
    if (isNaN(port) || port < 1024 || port > 65535) {
      toast.error("Please enter a valid port number between 1024 and 65535");
      return;
    }
    setServerPort(port);
    startServer();
    toast.success(`Server started on port ${port}`);
  };

  const handleStopServer = () => {
    stopServer();
    toast.info("Server stopped");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <Badge variant={isRunning ? "default" : "outline"} className={isRunning ? "bg-green-500" : ""}>
          {isRunning ? "Running" : "Stopped"}
        </Badge>
        {isRunning && <span className="text-sm">Port: {serverPort}</span>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="port">Port Number</Label>
        <Input
          id="port"
          type="text"
          value={portInput}
          onChange={(e) => setPortInput(e.target.value)}
          placeholder="8080"
          disabled={isRunning}
        />
      </div>
      
      {isRunning ? (
        <Button 
          onClick={handleStopServer} 
          className="w-full bg-red-500 hover:bg-red-600"
          variant="destructive"
        >
          Stop Server
        </Button>
      ) : (
        <Button 
          onClick={handleStartServer} 
          className="w-full"
        >
          Start Server
        </Button>
      )}
    </div>
  );
};

export default ServerStatus;
