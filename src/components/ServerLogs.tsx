
import { useRef, useEffect } from "react";
import { useServer } from "@/context/ServerContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const ServerLogs = () => {
  const { logs, clearLogs } = useServer();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogClass = (type: string) => {
    switch (type) {
      case "info": return "text-blue-600";
      case "error": return "text-red-600";
      case "success": return "text-green-600";
      case "request": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-[300px]">
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
            No logs available
          </div>
        ) : (
          <div className="space-y-1.5 font-mono text-xs">
            {logs.map((log, index) => (
              <div key={index} className={`${getLogClass(log.type)}`}>
                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-2 bg-gray-50 border-t flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearLogs} 
          className="text-xs h-7"
          disabled={logs.length === 0}
        >
          Clear Logs
        </Button>
      </div>
    </div>
  );
};

export default ServerLogs;
