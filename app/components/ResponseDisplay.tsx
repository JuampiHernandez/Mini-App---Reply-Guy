"use client";

import { useState } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { ResponseType, AnswerLength } from "./ReplyGuyApp";

export interface ResponseDisplayProps {
  response: string;
  responseType: ResponseType;
  answerLength: AnswerLength;
  postText: string;
  onRegenerate: () => void;
  onNewReply: () => void;
}

function getResponseTypeInfo(responseType: ResponseType) {
  switch (responseType) {
    case "smart":
      return {
        title: "Smart & Insightful Response",
        description: "Thoughtful, intelligent response that adds value to the conversation",
        color: "text-blue-600"
      };
    case "engagement":
      return {
        title: "Engagement & Viral Response",
        description: "Engaging response designed to boost interaction and reach",
        color: "text-green-600"
      };
    default:
      return {
        title: "Generated Response",
        description: "AI-generated reply",
        color: "text-gray-600"
      };
  }
}

function getAnswerLengthInfo(answerLength: AnswerLength) {
  switch (answerLength) {
    case "short":
      return {
        label: "Short",
        description: "Concise & punchy response"
      };
    case "long":
      return {
        label: "Long",
        description: "Detailed & comprehensive response"
      };
    default:
      return {
        label: "Standard",
        description: "Balanced response length"
      };
  }
}

export function ResponseDisplay({ response, responseType, answerLength, postText, onRegenerate, onNewReply }: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false);
  const responseTypeInfo = getResponseTypeInfo(responseType);
  const lengthInfo = getAnswerLengthInfo(answerLength);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-[var(--app-foreground)]">
          Your Perfect Reply is Ready!
        </h2>
        <div className="flex items-center justify-center space-x-4 text-sm text-[var(--ock-text-foreground-muted)]">
          <span className={`px-2 py-1 rounded-full bg-[var(--app-gray)]/20 ${responseTypeInfo.color}`}>
            {responseTypeInfo.title}
          </span>
          <span className="px-2 py-1 rounded-full bg-[var(--app-gray)]/20">
            {lengthInfo.label} Response
          </span>
        </div>
      </div>

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

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--app-foreground)]">
          Generated Response
        </label>
        <div className="p-4 bg-[var(--app-accent)]/5 border border-[var(--app-accent)]/20 rounded-lg">
          <p className="text-[var(--app-foreground)] whitespace-pre-wrap">{response}</p>
        </div>
      </div>

      <div className="space-y-4">
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

      <div className="text-center text-xs text-[var(--ock-text-foreground-muted)] space-y-1">
        <p>Click the info badges above to see what each option means</p>
        <p>Use the buttons below to copy, regenerate, or create a new reply</p>
      </div>
    </div>
  );
}
