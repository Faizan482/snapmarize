export default function SummaryViewer({ summary }: { summary: string }) {
  return (
    <div className="prose max-w-none">
      <p>{summary}</p>
    </div>
  );
}
