import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuBar.css'

export function MenuBarComponent() {
    const pagename = window.location.href.split('/').at(-1);

    useEffect(() => {
        var links = document.getElementsByClassName("menu-btn")
        for (let i = 0; i < links.length; i++) {
            links[i].firstChild.style.display = "none"
            if (links[i].innerText.toLowerCase() === pagename) {
                links[i].firstChild.style.display = "block"
            }
        }
    }, [])

    function displayMenu(e) {
        var el = e.target
        while (!el.className.includes("hamburger")) {
            el = el.parentNode
        }
        el.classList.toggle("change");
        el = document.getElementById("drop-menu")
        el.classList.toggle("hide-drop")
        ;el.classList.toggle("show-drop");
    }

    return (
        <div id="menu-bar">
            <div id="menu-logo">
                <div></div>
                <img src="images/soulyourroll_cover.jpg" />
            </div>
            <div id="menu">
                <div className="menu-btn"><div className="bar"></div><Link to='' >Home</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/listen' >Listen</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/news' >News</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/gallery'>Gallery</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/epk' >Press</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/contact'>Contact</Link></div>
            </div>
            <div className="hamburger-container" onClick={displayMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div id="drop-menu" className="hide-drop">
                <div className="menu-btn"><div className="bar"></div><Link to='' >Home</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/listen' >Listen</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/news' >News</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/gallery'>Gallery</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/epk' >Press</Link></div>
                <div className="menu-btn"><div className="bar"></div><Link to='/contact'>Contact</Link></div>
            </div>
        </div>
    )
}