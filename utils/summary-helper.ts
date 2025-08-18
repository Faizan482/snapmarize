export const parseSection = (section: string):{title: string; content: string[]} => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#") ? title.substring(1).trim() : title.trim();
  


  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("-")) {
      if (currentPoint) {
        points.push(currentPoint);
        currentPoint = "";
      }
      currentPoint = trimmedLine.substring(2).trim();
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint);
  }

  return { title: cleanTitle, content: points.filter((point)=>point && !point.startsWith("#") && !point.startsWith("[Choose")) };
};


export function parsePoint(content: string) {
  const isNumbered = /^\d+\./.test(content);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(content);
  const isEmpty = !content.trim();

  return { isNumbered, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.*)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim()
  };
}
