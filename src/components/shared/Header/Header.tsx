
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <nav className="nav">
                    <ul>
                        <li><a href="/">Ladies</a></li>
                        <li><a href="/about">Gentlemen</a></li>
                        <li><a href="/services">Children</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
