import React from "react";
import './Footer.css';

function Footer(): React.JSX.Element {
    return(
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Seturaman Kumar. All rights reserved.</p>
        </footer>
    )
}

export default Footer;