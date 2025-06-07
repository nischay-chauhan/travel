import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"; // Will be replaced later
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Search as SearchIcon, LogOut, UserCircle, Home, List, Heart, Building, CalendarCheck, PlusCircle } from "lucide-react"; // Renamed Search to SearchIcon
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input"; // Added Input for search
import ThemeToggle from "./ThemeToggle"; // Import ThemeToggle

const Navbar = () => {
  // const [dropdownMenu, setDropdownMenu] = useState(false); // Will be controlled by DropdownMenu
  // const [isSidebarOpen, setSidebarOpen] = useState(false); // Will be controlled by Sheet
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // const toggleSidebar = () => { // Replaced by Sheet's open/onOpenChange
  //   setSidebarOpen(!isSidebarOpen);
  // };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const profileSrc = user && user.profileImagePath
    ? `http://localhost:3001/${user.profileImagePath.replace("public", "")}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/properties/search/${search.trim()}`);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-3xl font-bold tracking-wide hover:opacity-80 transition-opacity duration-200">
        TOURIST
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6">
        {/* Desktop Search bar - can be added here if desired in future */}
        <Button variant="link" asChild className="text-primary-foreground hover:text-secondary-foreground transition-colors duration-200">
          <Link to={user ? "/create-listing" : "/login"}>Become A Host</Link>
        </Button>

        <ThemeToggle /> {/* Add ThemeToggle to desktop nav */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profileSrc} alt="profile" />
                <AvatarFallback>
                  <UserCircle className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card text-card-foreground" align="end">
            {!user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full cursor-pointer">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full cursor-pointer">Sign Up</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${user._id}/trips`} className="w-full flex items-center cursor-pointer">
                    <List className="mr-2 h-4 w-4" /> Trip List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${user._id}/wishList`} className="w-full flex items-center cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" /> Wish List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${user._id}/properties`} className="w-full flex items-center cursor-pointer">
                    <Building className="mr-2 h-4 w-4" /> Property List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${user._id}/reservation`} className="w-full flex items-center cursor-pointer">
                    <CalendarCheck className="mr-2 h-4 w-4" /> Reservation List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create-listing" className="w-full flex items-center cursor-pointer">
                    <PlusCircle className="mr-2 h-4 w-4" /> Become A Host
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="w-full flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Mobile Navigation - Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground w-4/5 sm:w-1/2 md:w-1/3 p-6 flex flex-col">
            <SheetHeader className="mb-6">
              <SheetTitle asChild>
                <Link to="/" className="text-2xl font-bold tracking-wide text-primary-foreground hover:opacity-80 transition-opacity duration-200">
                  TOURIST
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-24 h-24 mb-3">
                <AvatarImage src={profileSrc} alt="profile" />
                <AvatarFallback>
                  <UserCircle className="w-20 h-20" />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">
                {user ? user.username : "Guest"}
              </h3>
            </div>

            <div className="relative mb-6">
              <Input
                type="search"
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4 py-2 w-full bg-background text-foreground rounded-md focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <nav className="flex-grow flex flex-col space-y-3">
              {user ? (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to={`/`}><Home className="mr-3 h-5 w-5" />Home</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to={`/${user._id}/trips`}><List className="mr-3 h-5 w-5" />Trip List</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to={`/${user._id}/wishList`}><Heart className="mr-3 h-5 w-5" />Wish List</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to={`/${user._id}/properties`}><Building className="mr-3 h-5 w-5" />Property List</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to={`/${user._id}/reservation`}><CalendarCheck className="mr-3 h-5 w-5" />Reservation List</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to="/create-listing"><PlusCircle className="mr-3 h-5 w-5" />Become A Host</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start text-lg text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <LogOut className="mr-3 h-5 w-5" /> Log Out
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to="/login"><LogOut className="mr-3 h-5 w-5" />Log In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg">
                      <Link to="/register"><UserCircle className="mr-3 h-5 w-5" />Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </nav>

            <div className="mt-auto pt-6"> {/* Wrapper for ThemeToggle and Close button */}
              <div className="flex justify-center mb-4">  {/* Centering ThemeToggle */}
                <ThemeToggle />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">Close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
