import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { LogOut, Settings, User, SunMoon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  return (
    <nav className="flex flex-row justify-start items-center relative border-b py-0 px-4 h-14">
      <div className="grid place-items-center">
        <LayoutDashboard className="w-8 h-8" />
      </div>
      <div className="flex-1">
        <ul className="flex items-center">
          <li>
            <Link className={buttonVariants({ size: "sm", variant: "link" })} to="/builder/portal/apps">
              Apps
            </Link>
          </li>
          <li>
            <Link className={buttonVariants({ size: "sm", variant: "link" })} to="/builder/portal/users">
              Users
            </Link>
          </li>
          <li>
            <Link className={buttonVariants({ size: "sm", variant: "link" })} to="/builder/portal/plugins">
              Plugins
            </Link>
          </li>
          <li>
            <Link className={buttonVariants({ size: "sm", variant: "link" })} to="/builder/portal/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link className={buttonVariants({ size: "sm", variant: "link" })} to="/builder/portal/account">
              Account
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <span>Upgrade</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SunMoon className="mr-2 h-4 w-4" />
                <span>Theme</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
