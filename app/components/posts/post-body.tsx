type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-3xl mx-auto prose prose-pre:bg-transparent">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
