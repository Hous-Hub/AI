class ThemeManager {
    private themes: { [key: string]: string } = {
        "Styl 1": "styles/style1.css",
        "Styl 2": "styles/style2.css",
        "Styl 3": "styles/style3.css",
        "Styl 4": "styles/style4.css"
    };

    private currentTheme: string = "Styl 1";

    constructor() {
        this.renderLinks();
    }

    changeTheme(themeName: string) {
        const linkElement = document.getElementById("theme-link") as HTMLLinkElement;
        linkElement.href = this.themes[themeName];
        this.currentTheme = themeName;
    }

    renderLinks() {
        const container = document.getElementById("style-switcher") as HTMLElement;
        container.innerHTML = "";

        for (const theme in this.themes) {
            const btn = document.createElement("button");
            btn.textContent = theme;
            btn.onclick = () => this.changeTheme(theme);
            container.appendChild(btn);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new ThemeManager());