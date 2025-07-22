import Image from "next/image";

export function MainProjectItem({
  title,
  description,
  image,
}: {
  title: string;
  description: React.ReactNode;
  image: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
      <div className="w-full aspect-video rounded-lg relative overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div>
        <p className="text-base font-medium leading-normal">{title}</p>
        <p className="text-[#9cabba] text-sm font-normal leading-normal line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
}
