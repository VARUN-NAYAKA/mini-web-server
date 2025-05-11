
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServerLogs from "@/components/ServerLogs";
import ServerStatus from "@/components/ServerStatus";
import FileExplorer from "@/components/FileExplorer";
import CodeEditor from "@/components/CodeEditor";
import { ServerProvider } from "@/context/ServerContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800">Mini Web Server</h1>
        <p className="text-gray-600">A simple HTTP server demonstration</p>
      </header>
      
      <ServerProvider>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Server Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="preview">
                  <TabsList className="w-full justify-start border-b px-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="p-3">
                    <div className="bg-white border rounded min-h-[400px]">
                      <iframe 
                        src="about:blank" 
                        className="w-full h-[400px] border"
                        title="Server Preview"
                        id="preview-frame"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="files" className="p-3">
                    <FileExplorer />
                  </TabsContent>
                  <TabsContent value="code" className="p-3">
                    <CodeEditor />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Server Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ServerStatus />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Logs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ServerLogs />
              </CardContent>
            </Card>
          </div>
        </div>
      </ServerProvider>
      
      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>Mini Web Server - Educational Project</p>
      </footer>
    </div>
  );
};

export default Index;
