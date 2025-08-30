"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { ReplyGuyApp, ResponseType } from "./components/ReplyGuyApp";
import { ResponseDisplay } from "./components/ResponseDisplay";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<string>("");
  const [currentPostText, setCurrentPostText] = useState<string>("");
  const [currentResponseType, setCurrentResponseType] = useState<ResponseType>("smart");
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState<string>("");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleGenerateReply = async (postText: string, context: string, responseType: ResponseType) => {
    console.log('Starting reply generation:', { postText, context, responseType });
    setIsGenerating(true);
    setError("");
    setCurrentPostText(postText);
    setCurrentResponseType(responseType);
    
    try {
      console.log('Making API call to /api/generate-reply');
      const response = await fetch('/api/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postText,
          context,
          responseType,
        }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate reply');
      }

      const data = await response.json();
      console.log('API response data:', data);
      setGeneratedResponse(data.reply);
      setShowResponse(true);
    } catch (error) {
      console.error('Failed to generate reply:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate reply');
    } finally {
      console.log('Setting isGenerating to false');
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (currentPostText) {
      handleGenerateReply(currentPostText, "", currentResponseType);
    }
  };

  const handleNewReply = () => {
    setShowResponse(false);
    setGeneratedResponse("");
    setCurrentPostText("");
    setError("");
  };

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
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
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {!showResponse ? (
            <ReplyGuyApp 
              onGenerateReply={handleGenerateReply}
              isGenerating={isGenerating}
            />
          ) : (
            <ResponseDisplay
              response={generatedResponse}
              responseType={currentResponseType}
              postText={currentPostText}
              onRegenerate={handleRegenerate}
              onNewReply={handleNewReply}
            />
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">
                Error: {error}
              </p>
            </div>
          )}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
