import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import {
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  X,
  Type,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems, learnSections } from "../utils/navigation";
import UserDropdown from "./UserDropdown";

// Icon mapping for navigation items
const ICON_COMPONENTS = {
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  Type,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu,
};

// Sub-component for rendering desktop navigation items
const DesktopNavItem = ({ 
  item, 
  index, 
  isDropdownOpen, 
  handleDropdownToggle, 
  isActive,
  getIconComponent 
}) => {
  if (item.dropdown) {
    return (
      <div key={index} className="navbar-item dropdown">
        <button
          className={`dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
          onClick={() => handleDropdownToggle(index)}
        >
          {item.icon && React.createElement(getIconComponent(item.icon), {
            size: 18,
            className: "drop-icon",
          })}
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
          />
        </button>
        {isDropdownOpen === index && (
          <div className="dropdown-menu">
            {item.dropdown.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
                onClick={() => handleDropdownToggle(null)}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={index}
      to={item.path}
      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
    >
      {item.icon && React.createElement(getIconComponent(item.icon), {
        size: 18,
        className: "icon",
      })}
      <span>{item.label}</span>
    </Link>
  );
};

// Sub-component for rendering mobile navigation items
const MobileNavItem = ({ 
  item, 
  index, 
  isDropdownOpen, 
  handleDropdownToggle, 
  isActive,
  getIconComponent,
  setIsMobileMenuOpen
}) => {
  if (item.dropdown) {
    return (
      <div key={index} className="mobile-dropdown">
        <button
          className={`mobile-dropdown-toggle ${isDropdownOpen === index ? "active" : ""}`}
          onClick={() => handleDropdownToggle(index)}
        >
          {item.icon && React.createElement(getIconComponent(item.icon), {
            size: 18,
            className: "icon",
          })}
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`dropdown-arrow ${isDropdownOpen === index ? "rotated" : ""}`}
          />
        </button>
        {isDropdownOpen === index && (
          <div className="mobile-dropdown-menu">
            {item.dropdown.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`mobile-dropdown-item ${isActive(subItem.path) ? "active" : ""}`}
                onClick={() => {
                  handleDropdownToggle(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={index}
      to={item.path}
      className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {item.icon && React.createElement(getIconComponent(item.icon), {
        size: 18,
        className: "icon",
      })}
      <span>{item.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

  // Get icon component by name
  const getIconComponent = (iconName) => ICON_COMPONENTS[iconName] || null;

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside for dropdowns & search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation helpers
  const isActive = (path) => location.pathname === path;
  const handleDropdownToggle = (index) => setIsDropdownOpen(index === isDropdownOpen ? null : index);

  // ===================== Fuse.js Setup for Notes Search with Tags =====================
  const searchableNotes = learnSections.flatMap((section) =>
    section.items.map((note) => ({
      ...note,
      keywords: note.tags ? note.tags.join(" ") : "", // Use tags for search
      category: section.heading,
    }))
  );

  const fuse = new Fuse(searchableNotes, {
    keys: ["label", "path", "keywords"],
    threshold: 0.3,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const results = fuse
      .search(query)
      .map((res) => res.item)
      .filter((item) => categoryFilter === "All" || item.category === categoryFilter);

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };
  // ====================================================================================

  // Render notes dropdown for desktop
  const renderNotesDropdown = () => (
    <div className="navbar-item dropdown">
      <button
        className="dropdown-toggle"
        onClick={() => handleDropdownToggle("notes")}
      >
        <BookOpen size={18} className="drop-icon" />
        <span>Notes</span>
        <ChevronDown
          size={16}
          className={`dropdown-arrow ${isDropdownOpen === "notes" ? "rotated" : ""}`}
        />
      </button>
      {isDropdownOpen === "notes" && (
        <div className="dropdown-menu">
          <Link
            to="/notes/java"
            className={`dropdown-item ${isActive("/notes/java") ? "active" : ""}`}
            onClick={() => handleDropdownToggle(null)}
          >
            Java
          </Link>
          <Link
            to="/notes/python"
            className={`dropdown-item ${isActive("/notes/python") ? "active" : ""}`}
            onClick={() => handleDropdownToggle(null)}
          >
            Python
          </Link>
        </div>
      )}
    </div>
  );

  // Render notes dropdown for mobile
  const renderMobileNotesDropdown = () => (
    <div className="mobile-dropdown">
      <button
        className={`mobile-dropdown-toggle ${isDropdownOpen === "notes" ? "active" : ""}`}
        onClick={() => handleDropdownToggle("notes")}
      >
        <BookOpen size={18} className="icon" />
        <span>Notes</span>
        <ChevronDown
          size={16}
          className={`dropdown-arrow ${isDropdownOpen === "notes" ? "rotated" : ""}`}
        />
      </button>
      {isDropdownOpen === "notes" && (
        <div className="mobile-dropdown-menu">
          <Link
            to="/notes/java"
            className="mobile-dropdown-item"
            onClick={() => {
              handleDropdownToggle(null);
              setIsMobileMenuOpen(false);
            }}
          >
            Java
          </Link>
          <Link
            to="/notes/python"
            className="mobile-dropdown-item"
            onClick={() => {
              handleDropdownToggle(null);
              setIsMobileMenuOpen(false);
            }}
          >
            Python
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`navbar ${theme}`} ref={navbarRef}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text">
            Algo<span>Visualizer</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search algorithms or notes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-btn"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setIsSearchOpen(false);
              }}
            >
              <X size={16} />
            </button>
          )}
          <Search size={18} className="search-icon" />

          {/* Category Filter */}
          <select
            className="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            {learnSections.map((section, idx) => (
              <option key={idx} value={section.heading}>
                {section.heading}
              </option>
            ))}
          </select>

          {isSearchOpen && (
            <div className="search-results">
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="search-result-item"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {searchResults.length === 0 && (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="navbar-menu">
            {navbarNavigationItems.map((item, index) => (
              <DesktopNavItem
                key={index}
                item={item}
                index={index}
                isDropdownOpen={isDropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                isActive={isActive}
                getIconComponent={getIconComponent}
              />
            ))}

            {/* Notes Dropdown */}
            {renderNotesDropdown()}

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Mobile Navigation */}
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-menu">
            {navbarNavigationItems.map((item, index) => (
              <MobileNavItem
                key={index}
                item={item}
                index={index}
                isDropdownOpen={isDropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                isActive={isActive}
                getIconComponent={getIconComponent}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}

            {/* Notes dropdown in mobile */}
            {renderMobileNotesDropdown()}

            <div className="mobile-user-dropdown mt-4">
              <UserDropdown />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
