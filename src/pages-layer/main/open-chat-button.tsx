"use client";

import { MessageCircle } from "lucide-react";
import { usePortfolioChat } from "@/feature/chat/ui/chat-provider";

export function OpenChatButton({ label }: { label: string }) {
	const chat = usePortfolioChat();

	return (
		<button
			type="button"
			onClick={chat.open}
			className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
		>
			<MessageCircle size={16} aria-hidden />
			{label}
		</button>
	);
}
