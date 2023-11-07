import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function Davatar() {
  return (
    <Avatar className="cursor-pointer h-8 w-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default Davatar;
