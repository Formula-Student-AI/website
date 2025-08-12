type Props = {
  content: string;
};

export function EventContent({ content }: Props) {
  return (
    <div className="prose max-w-none prose-pre:bg-transparent">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
