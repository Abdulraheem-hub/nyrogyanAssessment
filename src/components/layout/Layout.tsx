import type { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
}

const Layout = ({ children, showSearch = true, searchValue = '', onSearchChange }: LayoutProps) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar 
          showSearch={showSearch} 
          searchValue={searchValue} 
          onSearchChange={onSearchChange} 
        />
        {children}
      </div>
    </div>
  )
}

export default Layout
