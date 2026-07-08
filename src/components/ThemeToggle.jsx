function ThemeToggle({ theme, setTheme }) {
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="material-symbols-outlined w-10 h-10 flex justify-center items-center rounded-4xl hover:bg-(--bg-input) transition-all duration-1000 ease-in-out cursor-pointer text-(--text-secondary)"
        >
            {theme === "light" ? "bedtime" : "sunny"}
        </button>
    );
}

export default ThemeToggle;