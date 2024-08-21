type Props = {
  id: string;
};

export default function YoutubeVideo({ id }: Props) {
  return (
    <div className="aspect-w-16  aspect-h-9 my-10">
      <iframe
        allowFullScreen
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;full-screen"
      />
    </div>
  );
}
