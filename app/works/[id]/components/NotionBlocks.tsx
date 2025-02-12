"use client";

import { Fragment } from "react";

type Block = {
  type: string;
  id: string;
  paragraph?: {
    rich_text: any[];
  };
  heading_1?: {
    rich_text: any[];
  };
  heading_2?: {
    rich_text: any[];
  };
  heading_3?: {
    rich_text: any[];
  };
  bulleted_list_item?: {
    rich_text: any[];
  };
  numbered_list_item?: {
    rich_text: any[];
  };
  image?: {
    type: "external" | "file";
    external?: { url: string };
    file?: { url: string };
    caption?: { plain_text: string }[];
  };
  video?: {
    type: "external" | "file";
    external?: { url: string };
    file?: { url: string };
  };
};

type NotionBlocksProps = {
  blocks: Block[];
};

// テキストの色に対応するTailwindクラスのマッピング
const colorMap = {
  default: "text-gray-600",
  gray: "text-gray-500",
  brown: "text-amber-700",
  orange: "text-orange-600",
  yellow: "text-yellow-600",
  green: "text-green-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  pink: "text-pink-600",
  red: "text-red-600",
  gray_background: "bg-gray-100",
  brown_background: "bg-amber-100",
  orange_background: "bg-orange-100",
  yellow_background: "bg-yellow-100",
  green_background: "bg-green-100",
  blue_background: "bg-blue-100",
  purple_background: "bg-purple-100",
  pink_background: "bg-pink-100",
  red_background: "bg-red-100",
};

export function NotionBlocks({ blocks }: NotionBlocksProps) {
  // リストアイテムをグループ化する関数
  const groupListItems = (blocks: Block[]) => {
    let currentList: Block[] = [];
    const result: (Block | Block[])[] = [];
    let currentType: string | null = null;

    blocks.forEach((block) => {
      if (
        (block.type === "numbered_list_item" || block.type === "bulleted_list_item") &&
        block.type === currentType
      ) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          result.push([...currentList]);
          currentList = [];
        }
        if (block.type === "numbered_list_item" || block.type === "bulleted_list_item") {
          currentType = block.type;
          currentList.push(block);
        } else {
          result.push(block);
          currentType = null;
        }
      }
    });

    if (currentList.length > 0) {
      result.push([...currentList]);
    }

    return result;
  };

  // YouTubeのURLを埋め込み用に変換する関数
  const convertYouTubeUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // リッチテキストをレンダリングする関数
  const renderRichText = (text: any) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code, color },
      text: { content, link },
    } = text;

    // スタイルのクラスを組み立てる
    const styles = [
      colorMap[color as keyof typeof colorMap] || colorMap.default,
      "whitespace-pre-wrap", // 改行を保持
    ].filter(Boolean).join(" ");

    let renderedText = (
      <span className={styles}>
        {content}
      </span>
    );

    if (bold) renderedText = <strong>{renderedText}</strong>;
    if (italic) renderedText = <em>{renderedText}</em>;
    if (strikethrough) renderedText = <del>{renderedText}</del>;
    if (underline) renderedText = <u>{renderedText}</u>;
    if (code) renderedText = <code className="bg-gray-100 px-1 rounded">{renderedText}</code>;
    if (link) renderedText = <a href={link.url} className="text-blue-600 hover:underline">{renderedText}</a>;

    return renderedText;
  };

  // 個別のブロックをレンダリングする関数
  const renderBlock = (block: Block) => {
    const { type, id } = block;

    switch (type) {
      case "paragraph":
        return (
          <p key={id} className="text-gray-600 mb-6">
            {block.paragraph?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </p>
        );

      case "heading_1":
        return (
          <h1 key={id} className="text-3xl font-bold text-gray-900 mb-6">
            {block.heading_1?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </h1>
        );

      case "heading_2":
        return (
          <h2 key={id} className="text-2xl font-bold text-gray-900 mb-4">
            {block.heading_2?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </h2>
        );

      case "heading_3":
        return (
          <h3 key={id} className="text-xl font-bold text-gray-900 mb-4">
            {block.heading_3?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </h3>
        );

      case "bulleted_list_item":
        return (
          <li key={id} className="text-gray-600">
            {block.bulleted_list_item?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </li>
        );

      case "numbered_list_item":
        return (
          <li key={id} className="text-gray-600">
            {block.numbered_list_item?.rich_text.map((text: any, i: number) => (
              <Fragment key={i}>{renderRichText(text)}</Fragment>
            ))}
          </li>
        );

      case "image":
        const imageUrl = block.image?.type === "external" 
          ? block.image.external?.url 
          : block.image?.file?.url;
        const caption = block.image?.caption?.length ? block.image.caption[0].plain_text : "";

        return (
          <figure key={id} className="mb-8">
            <img
              src={imageUrl}
              alt={caption}
              className="w-full rounded-lg"
            />
            {caption && (
              <figcaption className="mt-2 text-sm text-center text-gray-500">
                {caption}
              </figcaption>
            )}
          </figure>
        );

      case "video":
        const videoUrl = block.video?.type === "external"
          ? convertYouTubeUrl(block.video.external?.url || "")
          : block.video?.file?.url;

        return (
          <div key={id} className="mb-8 aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      default:
        return null;
    }
  };

  // ブロックをグループ化してレンダリング
  const groupedBlocks = groupListItems(blocks);

  return (
    <div className="max-w-none prose prose-purple">
      {groupedBlocks.map((block, index) => {
        if (Array.isArray(block)) {
          if (block[0].type === "numbered_list_item") {
            return (
              <ol key={`list-${index}`} className="list-decimal list-inside mb-6">
                {block.map(item => renderBlock(item))}
              </ol>
            );
          } else {
            return (
              <ul key={`list-${index}`} className="list-disc list-inside mb-6">
                {block.map(item => renderBlock(item))}
              </ul>
            );
          }
        } else {
          return renderBlock(block);
        }
      })}
    </div>
  );
}