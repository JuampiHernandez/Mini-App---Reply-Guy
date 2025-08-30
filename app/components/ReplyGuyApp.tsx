"use client";

import { useState, useEffect } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

export type ResponseType = "smart" | "engagement";
export type AnswerLength = "short" | "long";

export interface ReplyGuyAppProps {
  onGenerateReply: (postText: string, context: string, responseType: ResponseType, answerLength: AnswerLength) => void;
  isGenerating: boolean;
}

const responseTypes = [
  {
    id: "smart" as ResponseType,
    title: "Smart & Insightful",
    description: "Thoughtful, intelligent responses that add value to the conversation",
    icon: "💡"
  },
  {
    id: "engagement" as ResponseType,
    title: "Engagement & Viral",
    description: "Engaging responses designed to boost interaction and reach",
    icon: "🚀"
  }
];

export function ReplyGuyApp({ onGenerateReply, isGenerating }: ReplyGuyAppProps) {
  const [postText, setPostText] = useState("");
  const [context, setContext] = useState("");
  const [responseType, setResponseType] = useState<ResponseType>("smart");
  const [answerLength, setAnswerLength] = useState<AnswerLength>("short");

  const isButtonDisabled = !postText.trim();

  useEffect(() => {
    console.log("Button disabled state:", { isButtonDisabled, postTextLength: postText.length, isGenerating });
  }, [isButtonDisabled, postText, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      onGenerateReply(postText.trim(), context.trim(), responseType, answerLength);
    }
  };

  const handleStrategySelect = (type: ResponseType) => {
    setResponseType(type);
  };

  const handleLengthSelect = (length: AnswerLength) => {
    setAnswerLength(length);
  };

  if (isGenerating) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="animate-spin text-4xl">🤖</div>
          <h2 className="text-xl font-semibold text-[var(--app-foreground)]">
            AI is crafting your perfect reply...
          </h2>
          <p className="text-sm text-[var(--ock-text-foreground-muted)]">
            Using GPT-4 to generate a {responseType} response
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[var(--app-foreground)]">
          Reply Guy
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--app-foreground)]">
            Post Text *
          </label>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Paste the post you want to reply to..."
            className="w-full p-3 border border-[var(--app-gray)] rounded-lg bg-[var(--app-background)] text-[var(--app-foreground)] resize-none"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--app-foreground)]">
            Context (Optional)
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Add any additional context or tone preferences..."
            className="w-full p-3 border border-[var(--app-gray)] rounded-lg bg-[var(--app-background)] text-[var(--app-foreground)] resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--app-foreground)]">
              Response Strategy *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {responseTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleStrategySelect(type.id)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer text-left relative group ${
                    responseType === type.id
                      ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
                      : "border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{type.icon}</span>
                    <button
                      type="button"
                      className="text-[var(--ock-text-foreground-muted)] hover:text-[var(--app-foreground)] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show tooltip or modal with description
                        alert(type.description);
                      }}
                    >
                      <Icon name="info" size="sm" />
                    </button>
                  </div>
                  <h3 className="font-medium text-[var(--app-foreground)]">{type.title}</h3>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--app-foreground)]">
              Answer Length *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLengthSelect("short")}
                className={`p-3 rounded-lg border transition-all cursor-pointer text-center ${
                  answerLength === "short"
                    ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
                    : "border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
                }`}
              >
                <div className="font-medium text-[var(--app-foreground)]">Short</div>
                <div className="text-xs text-[var(--ock-text-foreground-muted)]">Concise & punchy</div>
              </button>
              <button
                type="button"
                onClick={() => handleLengthSelect("long")}
                className={`p-3 rounded-lg border transition-all cursor-pointer text-center ${
                  answerLength === "long"
                    ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
                    : "border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
                }`}
              >
                <div className="font-medium text-[var(--app-foreground)]">Long</div>
                <div className="text-xs text-[var(--ock-text-foreground-muted)]">Detailed & comprehensive</div>
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full text-white transition-all ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-[var(--app-accent)] hover:bg-[var(--app-accent)]/90"
          }`}
          icon={<Icon name="star" size="sm" />}
        >
          {isButtonDisabled ? "Add post text to enable" : "Generate Perfect Reply"}
        </Button>
      </form>
    </div>
  );
}
