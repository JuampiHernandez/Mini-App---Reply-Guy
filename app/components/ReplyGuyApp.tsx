"use client";

import { useState, useEffect } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

export type ResponseType = "smart" | "engagement";

interface ReplyGuyAppProps {
  onGenerateReply: (postText: string, context: string, responseType: ResponseType) => void;
  isGenerating: boolean;
}

export function ReplyGuyApp({ onGenerateReply, isGenerating }: ReplyGuyAppProps) {
  const [postText, setPostText] = useState("");
  const [context, setContext] = useState("");
  const [responseType, setResponseType] = useState<ResponseType>("smart");

  // Debug logging
  useEffect(() => {
    console.log('ReplyGuyApp state:', { postText, context, responseType, isGenerating });
  }, [postText, context, responseType, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { postText, context, responseType });
    if (postText.trim()) {
      onGenerateReply(postText.trim(), context.trim(), responseType);
    } else {
      console.log('Post text is empty, cannot submit');
    }
  };

  const handleStrategySelect = (type: ResponseType) => {
    console.log('Strategy selected:', type);
    setResponseType(type);
  };

  const responseTypes = [
    {
      id: "smart" as ResponseType,
      label: "Smart & Insightful",
      icon: "🧠",
      description: "Thoughtful, well-reasoned responses"
    },
    {
      id: "engagement" as ResponseType,
      label: "Engagement & Viral",
      icon: "🚀",
      description: "Fun, controversial, shareable content"
    }
  ];

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
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[var(--app-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isButtonDisabled = !postText.trim() || isGenerating;
  console.log('Button disabled state:', { isButtonDisabled, postTextLength: postText.length, isGenerating });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[var(--app-foreground)]">
          🐸 Reply Guy 🐸
        </h1>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Post Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--app-foreground)]">
            Post to Reply To *
          </label>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Paste the post text you want to reply to..."
            className="w-full h-24 px-3 py-2 border border-[var(--app-gray)] rounded-lg bg-[var(--app-background)] text-[var(--app-foreground)] placeholder-[var(--ock-text-foreground-muted)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
            required
          />
          <div className="text-xs text-[var(--ock-text-foreground-muted)]">
            Characters: {postText.length} | Button will be enabled when you add text
          </div>
        </div>

        {/* Context Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--app-foreground)]">
            Extra Context (Optional)
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Add any personal context, tone preferences, or specific goals..."
            className="w-full h-20 px-3 py-2 border border-[var(--app-gray)] rounded-lg bg-[var(--app-background)] text-[var(--app-foreground)] placeholder-[var(--ock-text-foreground-muted)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
          />
        </div>

        {/* Response Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--app-foreground)]">
            Response Strategy * (Current: {responseType})
          </label>
          <div className="grid grid-cols-2 gap-2">
            {responseTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleStrategySelect(type.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  responseType === type.id
                    ? "border-[var(--app-accent)] bg-[var(--app-accent)]/10"
                    : "border-[var(--app-gray)] hover:border-[var(--app-accent)]/50"
                }`}
              >
                <div className="text-center space-y-1">
                  <div className="text-lg">{type.icon}</div>
                  <div className="text-xs font-medium text-[var(--app-foreground)]">
                    {type.label}
                  </div>
                  <div className="text-xs text-[var(--ock-text-foreground-muted)]">
                    {type.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
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
