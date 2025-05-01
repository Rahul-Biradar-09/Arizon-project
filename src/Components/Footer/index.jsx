import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

import "./index.css"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-icons-container">
                <img src="https://static.vecteezy.com/system/resources/previews/004/201/564/non_2x/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" alt="facebook" className="footer-image"/>
                <img src="https://static.vecteezy.com/system/resources/previews/018/930/691/non_2x/instagram-logo-instagram-icon-transparent-free-png.png" alt="instagram" className="footer-image"/>
                <img src="https://brandlogos.net/wp-content/uploads/2016/06/linkedin-logo.png" alt="linkedin" className="footer-image"/>
            </div>
            <p className="footer-para">All Rights Reserved @2025</p>
        </div>
    )
}

export default Footer