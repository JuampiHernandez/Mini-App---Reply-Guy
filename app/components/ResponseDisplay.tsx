"use client";

import { useState } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { ResponseType } from "./ReplyGuyApp";

interface ResponseDisplayProps {
  response: string;
  responseType: ResponseType;
  postText: string;
  onRegenerate: () => void;
  onNewReply: () => void;
}

export function ResponseDisplay({ 
  response, 
  responseType, 
  postText, 
  onRegenerate, 
  onNewReply 
}: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getResponseTypeInfo = (type: ResponseType) => {
    switch (type) {
      case "smart":
        return { icon: "🧠", label: "Smart & Insightful", color: "text-blue-500" };
      case "engagement":
        return { icon: "🚀", label: "Engagement & Viral", color: "text-orange-500" };
      default:
        return { icon: "✨", label: "AI Generated", color: "text-gray-500" };
    }
  };

  const typeInfo = getResponseTypeInfo(responseType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl">{typeInfo.icon}</span>
          <h2 className="text-xl font-bold text-[var(--app-foreground)]">
            Your Perfect Reply
          </h2>
        </div>
        <p className="text-sm text-[var(--ock-text-foreground-muted)]">
          Generated using {typeInfo.label} strategy
        </p>
      </div>

      {/* Original Post Context */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--app-foreground)]">
          Original Post
        </label>
        <div className="p-3 bg-[var(--app-gray)]/20 rounded-lg border border-[var(--app-gray)]">
          <p className="text-sm text-[var(--app-foreground)] italic">
            &ldquo;{postText}&rdquo;
          </p>
        </div>
      </div>

      {/* Generated Response */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--app-foreground)]">
          AI Generated Reply
        </label>
        <div className="p-4 bg-gradient-to-br from-[var(--app-accent)]/10 to-[var(--app-accent)]/5 rounded-lg border border-[var(--app-accent)]/20">
          <p className="text-[var(--app-foreground)] leading-relaxed">
            {response}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <Button
          onClick={handleCopy}
          className="w-full bg-[var(--app-accent)] text-white hover:bg-[var(--app-accent)]/90"
          icon={copied ? <Icon name="check" size="sm" /> : <Icon name="copy" size="sm" />}
        >
          {copied ? "Copied!" : "Copy Reply"}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            onClick={onRegenerate}
            className="border border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
            icon={<Icon name="refresh" size="sm" />}
          >
            Regenerate
          </Button>
          
          <Button
            variant="ghost"
            onClick={onNewReply}
            className="border border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
            icon={<Icon name="plus" size="sm" />}
          >
            New Reply
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center p-3 bg-[var(--app-gray)]/10 rounded-lg">
        <p className="text-xs text-[var(--ock-text-foreground-muted)]">
          Copy the reply above and paste it manually in your Farcaster app
        </p>
      </div>
    </div>
  );
}
