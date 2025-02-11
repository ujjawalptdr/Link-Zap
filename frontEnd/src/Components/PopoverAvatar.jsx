import React, { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { UserContext } from "./Contexts/UserContext";
import axios from "axios";
import { serverUrl } from "@/helpers/Constants";
import { toast } from "sonner";
import { useUrlContext } from "./Contexts/UrlContext";



const PopoverAvatar = () => {
    const { user, logoutUser } = useContext(UserContext);
    const { resetUrlList } = useUrlContext();

    const handleLogOut = async () => {
        try {
            const res = await axios.get(`${serverUrl}/user/logout`, {
                withCredentials: true
            });

            if (res) {
                logoutUser();
                resetUrlList();
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 ">
                <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                    </Avatar>
                    <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col text-gray-600 items-start mt-2">
                    <div className="flex items-center gap-3">
                        <LogOut />
                        <Button variant="link" className="font-semibold" onClick={handleLogOut}>
                            Logout
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PopoverAvatar