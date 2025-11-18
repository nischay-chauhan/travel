import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
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
import { Menu, Search as SearchIcon, LogOut, UserCircle, Home, List, Heart, Building, CalendarCheck, PlusCircle, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const profileSrc = user && user.profileImagePath
    ? `/${user.profileImagePath.replace("public", "")}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/properties/search/${search.trim()}`);
    }
  };

  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-border/20 text-foreground sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Globe className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400">TOURIST</span>
          </Link>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-4 pr-12 py-2 w-full rounded-full border-2 border-gray-700 bg-gray-900/80 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-2 h-8 w-8"
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              asChild 
              className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full px-4 py-2 font-medium transition-all duration-200"
            >
              <Link to={user ? "/create-listing" : "/login"}>Become a Host</Link>
            </Button>

            <ThemeToggle />

            <div className="flex items-center space-x-1 border border-gray-700 rounded-full p-1 hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-200 bg-gray-900/50">
              <Button variant="ghost" size="sm" className="rounded-full p-2 text-gray-300 hover:bg-gray-800">
                <Menu className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full p-1 hover:bg-gray-800">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileSrc} alt="profile" />
                      <AvatarFallback className="bg-blue-600 text-white">
                        <UserCircle className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-gray-900 border border-gray-800 text-white" align="end">
                  {!user ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/login" className="w-full cursor-pointer font-medium">Log In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/register" className="w-full cursor-pointer">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="font-semibold">{user.username}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/${user._id}/trips`} className="w-full flex items-center cursor-pointer">
                          <List className="mr-3 h-4 w-4" /> Your trips
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/${user._id}/wishList`} className="w-full flex items-center cursor-pointer">
                          <Heart className="mr-3 h-4 w-4" /> Wishlists
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/${user._id}/properties`} className="w-full flex items-center cursor-pointer">
                          <Building className="mr-3 h-4 w-4" /> Your properties
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/${user._id}/reservation`} className="w-full flex items-center cursor-pointer">
                          <CalendarCheck className="mr-3 h-4 w-4" /> Reservations
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/create-listing" className="w-full flex items-center cursor-pointer">
                          <PlusCircle className="mr-3 h-4 w-4" /> Host your home
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="w-full flex items-center cursor-pointer text-destructive">
                        <LogOut className="mr-3 h-4 w-4" /> Log out
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              onClick={() => document.getElementById('mobile-search').focus()}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-gray-900/95 backdrop-blur-md border-l border-gray-800 text-white">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b border-gray-800">
                    <SheetTitle asChild>
                      <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white">
                        <Globe className="w-6 h-6 text-blue-400" />
                        <span>TOURIST</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={profileSrc} alt="profile" />
                          <AvatarFallback className="bg-blue-600 text-white">
                            <UserCircle className="w-8 h-8" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg text-white">
                            {user ? user.username : "Guest"}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {user ? "Show profile" : "Log in for the best experience"}
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSearch} className="relative mb-6">
                        <Input
                          id="mobile-search"
                          type="search"
                          placeholder="Search destinations..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-4 pr-10 py-3 w-full rounded-full border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-1 h-8 w-8"
                        >
                          <SearchIcon className="h-3 w-3" />
                        </Button>
                      </form>

                      <nav className="space-y-1">
                        {user ? (
                          <>
                            <SheetClose asChild>
                              <Button variant="ghost" asChild className="w-full justify-start text-base font-medium h-14 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200">
                                <Link to="/">
                                  <Home className="mr-3 h-5 w-5" />
                                  Home
                                </Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200">
                                <Link to={`/${user._id}/trips`}>
                                  <List className="mr-3 h-5 w-5" />
                                  Your trips
                                </Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200">
                                <Link to={`/${user._id}/wishList`}>
                                  <Heart className="mr-3 h-5 w-5" />
                                  Wishlists
                                </Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200">
                                <Link to={`/${user._id}/properties`}>
                                  <Building className="mr-3 h-5 w-5" />
                                  Your properties
                                </Link>
                              </Button>
                            </SheetClose>
                            <div className="border-t border-gray-800 pt-2 mt-2">
                              <SheetClose asChild>
                                <Button variant="ghost" asChild className="w-full justify-start text-base h-14 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200">
                                  <Link to="/create-listing">
                                    <PlusCircle className="mr-3 h-5 w-5" />
                                    Host your home
                                  </Link>
                                </Button>
                              </SheetClose>
                              <SheetClose asChild>
                                <Button
                                  onClick={handleLogout}
                                  variant="ghost"
                                  className="w-full justify-start text-base h-14 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                                >
                                  <LogOut className="mr-3 h-5 w-5" />
                                  Log out
                                </Button>
                              </SheetClose>
                            </div>
                          </>
                        ) : (
                          <>
                            <SheetClose asChild>
                              <Button variant="default" asChild className="w-full justify-center text-base h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
                                <Link to="/login">Log in</Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button variant="outline" asChild className="w-full justify-center text-base h-14 rounded-lg border-gray-700 text-white hover:bg-gray-800 transition-colors duration-200">
                                <Link to="/register">Sign up</Link>
                              </Button>
                            </SheetClose>
                          </>
                        )}
                      </nav>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-800">
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
