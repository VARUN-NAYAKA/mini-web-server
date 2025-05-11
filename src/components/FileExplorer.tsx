
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServer } from "@/context/ServerContext";
import { toast } from "sonner";
import { FolderIcon, FileIcon } from "lucide-react";

const FileExplorer = () => {
  const { files, addFile, deleteFile } = useServer();
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const getFileIcon = (filename: string) => {
    return <FileIcon className="h-4 w-4" />;
  };

  const handleCreateFile = () => {
    if (!newFileName) {
      toast.error("Please enter a file name");
      return;
    }
    
    // Add extension if not provided
    let filename = newFileName;
    if (!filename.includes(".")) {
      filename += ".html";
    }
    
    if (files.some(f => f.name === filename)) {
      toast.error(`File ${filename} already exists`);
      return;
    }
    
    addFile({
      name: filename,
      content: newFileContent || `<!DOCTYPE html>
<html>
<head>
    <title>${filename}</title>
</head>
<body>
    <h1>Hello from ${filename}</h1>
</body>
</html>`
    });
    
    setNewFileName("");
    setNewFileContent("");
    toast.success(`File created`);
  };

  const handleDeleteFile = (filename: string) => {
    deleteFile(filename);
    if (selectedFile === filename) {
      setSelectedFile(null);
    }
  };

  return (
    <div className="border rounded">
      <div className="p-2 bg-gray-50 border-b">
        <h3 className="font-medium text-sm flex items-center">
          <FolderIcon className="h-4 w-4 mr-1" /> Files
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
        <div className="border-r p-3 overflow-auto">
          <div className="space-y-1">
            {files.length === 0 ? (
              <div className="text-gray-500 text-sm p-2">
                No files yet
              </div>
            ) : (
              files.map(file => (
                <div 
                  key={file.name}
                  className={`flex items-center justify-between p-1 rounded ${selectedFile === file.name ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedFile(file.name)}
                >
                  <div className="flex items-center space-x-1">
                    {getFileIcon(file.name)}
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 opacity-60 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(file.name);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="p-3 overflow-auto">
          <Tabs defaultValue="create">
            <TabsList className="w-full">
              <TabsTrigger value="create" className="flex-1">New File</TabsTrigger>
              <TabsTrigger value="view" className="flex-1" disabled={selectedFile === null}>
                View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-3 space-y-2">
              <Input 
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="File name (e.g., page.html)"
              />
              
              <textarea
                value={newFileContent}
                onChange={(e) => setNewFileContent(e.target.value)}
                placeholder="HTML content..."
                className="w-full h-32 p-2 border rounded text-sm font-mono"
              />
              
              <Button 
                onClick={handleCreateFile} 
                className="w-full"
                size="sm"
              >
                Create File
              </Button>
            </TabsContent>
            
            <TabsContent value="view" className="mt-3">
              {selectedFile && (
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">{selectedFile}</h3>
                  <pre className="border rounded p-2 bg-gray-50 overflow-auto text-xs h-48">
                    {files.find(f => f.name === selectedFile)?.content}
                  </pre>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
