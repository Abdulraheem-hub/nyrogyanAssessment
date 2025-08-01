import { Search, Bell, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { useState } from 'react'

interface NavbarProps {
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
}

const Navbar = ({ showSearch = true, searchValue = '', onSearchChange }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="border-b border-solid border-b-[#e7eef3] bg-white sticky top-0 z-40">
      {/* Desktop and Mobile Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-4 text-[#0e161b]">
          <Link to="/" className="text-xl font-bold hover:text-blue-600">
            NirogGyan
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-9">
          <Link to="/" className="text-sm font-medium text-[#0e161b] hover:text-blue-600">
            Home
          </Link>
          <a href="#" className="text-sm font-medium text-[#0e161b] hover:text-blue-600">
            Doctors
          </a>
          <Link to="/appointments" className="text-sm font-medium text-[#0e161b] hover:text-blue-600">
            Appointments
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex flex-1 justify-end gap-4 max-w-sm">
          {showSearch && (
            <div className="relative flex-1 max-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search doctors..." 
                className="pl-10 h-10 bg-[#e7eef3] border-0"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-[#e7eef3] text-[#0e161b] hover:bg-gray-200 hover:scale-105 transition-all duration-200"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Link to="/profile">
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-blue-600">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Link to="/profile">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="h-10 w-10 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search doctors..." 
              className="pl-10 h-10 bg-[#e7eef3] border-0 w-full"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e7eef3] bg-white">
          <nav className="px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block text-sm font-medium text-[#0e161b] hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#" 
              className="block text-sm font-medium text-[#0e161b] hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Doctors
            </a>
            <Link 
              to="/appointments" 
              className="block text-sm font-medium text-[#0e161b] hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Appointments
            </Link>
            <a 
              href="#" 
              className="block text-sm font-medium text-[#0e161b] hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Health Records
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
