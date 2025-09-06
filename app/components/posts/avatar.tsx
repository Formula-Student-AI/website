type Props = {
  name: string;
  image: string;
};

import Image from "next/image";

const Avatar = ({ name, image }: Props) => {
  return (
    <div className="flex items-center">
      <Image src={image} className="w-12 h-12 rounded-full mr-4" alt={name} width={100} height={100} />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
