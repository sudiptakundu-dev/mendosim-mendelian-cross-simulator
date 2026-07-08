import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

function Header({ theme, setTheme }) {
  return (
    <div className="bg-(--bg-card) p-6 flex justify-between items-center border-b border-b-(--border) shadow-[2px_4px_10px_(--shadow)] sticky top-0 z-1000">
      <Logo />
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default Header;