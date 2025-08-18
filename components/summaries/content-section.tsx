import { parseEmojiPoint, parsePoint } from "@/utils/summary-helper";

const EmojiPoints = ({ point, index }: { point: string; index: number }) => {
  const { emoji, text } = parseEmojiPoint(point) || {};
  return (
     <div
            key={`point-${index}`}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex items-start gap-3">
              <span className="text-lg lg:text-xl shrink-0 pt-1">
                {emoji}
              </span>
              <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                {text}
              </p>
            </div>
          </div>
  );
};


const RegularPoints = ({ point, index }: { point: string; index: number }) => {
  return (
    <div
      key={`point-${index}`}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {point}
        </p>
      </div>
    </div>
  );
};

export default function ContentSection({ title, content }: { title: string; content: string[] }) {
  return (
    <div className="space-y-4">
      {content.map((point, index) => {
        const { hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null; // skip empty points

        if (hasEmoji) {
          return <EmojiPoints key={index} index={index} point={point} />;
        }

        return <RegularPoints key={index} index={index} point={point} />;
      })}
    </div>
  );
}
