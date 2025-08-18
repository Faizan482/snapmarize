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