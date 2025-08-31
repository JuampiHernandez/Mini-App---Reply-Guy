"use client";

import { useState, useEffect, useCallback } from "react";
import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { ReplyGuyApp, ResponseType, AnswerLength } from "./components/ReplyGuyApp";
import { ResponseDisplay } from "./components/ResponseDisplay";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [currentPostText, setCurrentPostText] = useState("");
  const [currentResponseType, setCurrentResponseType] = useState<ResponseType>("smart");
  const [currentAnswerLength, setCurrentAnswerLength] = useState<AnswerLength>("short");
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState("");

  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleGenerateReply = async (postText: string, context: string, responseType: ResponseType, answerLength: AnswerLength) => {
    console.log("Generating reply:", { postText, context, responseType, answerLength });
    setIsGenerating(true);
    setError("");
    setCurrentPostText(postText);
    setCurrentResponseType(responseType);
    setCurrentAnswerLength(answerLength);

    try {
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postText, context, responseType, answerLength }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
      
      if (data.reply) {
        setGeneratedResponse(data.reply);
        setShowResponse(true);
      } else {
        throw new Error("No reply generated");
      }
    } catch (error) {
      console.error("Error generating reply:", error);
      setError(error instanceof Error ? error.message : "Failed to generate reply");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (currentPostText) {
      handleGenerateReply(currentPostText, "", currentResponseType, currentAnswerLength);
    }
  };

  const handleNewReply = () => {
    setShowResponse(false);
    setGeneratedResponse("");
    setCurrentPostText("");
    setError("");
  };

  const saveFrameButton = frameAdded ? (
    <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF]">
      <Icon name="check" size="sm" className="text-[#0052FF]" />
      <span>Saved</span>
    </div>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleAddFrame}
      className="text-[var(--app-accent)] p-4"
      icon={<Icon name="plus" size="sm" />}
    >
      Save Frame
    </Button>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <header className="flex items-center justify-between p-4 border-b border-[var(--app-gray)]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--app-accent)] rounded-lg flex items-center justify-center">
            <Icon name="star" size="sm" className="text-white" />
          </div>
          <h1 className="text-lg font-semibold">Reply Guy</h1>
        </div>
        {saveFrameButton}
      </header>

      <main className="flex-1 p-4">
        {!showResponse ? (
          <ReplyGuyApp onGenerateReply={handleGenerateReply} isGenerating={isGenerating} />
        ) : (
          <ResponseDisplay
            response={generatedResponse}
            responseType={currentResponseType}
            answerLength={currentAnswerLength}
            postText={currentPostText}
            onRegenerate={handleRegenerate}
            onNewReply={handleNewReply}
          />
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500">Error: {error}</p>
          </div>
        )}
      </main>

      <footer className="p-4 text-center text-sm text-[var(--ock-text-foreground-muted)] border-t border-[var(--app-gray)]">
        Powered by GPT-4 AI • Built with OnchainKit
      </footer>
    </div>
  );
}
