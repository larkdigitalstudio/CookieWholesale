import React from "react";
import NavBar from "../Components/Navbar/NavBar.jsx";
import './Pages.css'
import media from '../Assets/Media.jpg'
import Button from '@mui/material/Button';

const LoginPage = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div id="mainContentLogin">
                <section id="registerSection">
                        <img id="registerImage" src={media} alt="A fresh Kinda Bueno cookie from Cosy Cookie Co" />
                    <div id="registerText">
                        <h2>Welcome to Cosy Cookie Co's Wholesale Portal</h2>
                        <p className="wholesale-paragraph">
                        <strong>Bring the joy of freshly baked, premium cookies to your customers.</strong>
                        </p>
                        <p className="wholesale-paragraph">
                            At Cosy Cookie Co, we craft irresistibly chunky cookies using only the highest quality
                            ingredients, baked fresh locally in the Northern Rivers, NSW. Our cookies are a proven
                            favorite among cookie lovers, delivering both exceptional taste and indulgence in every bite.
                        </p>
                        <h2 className="wholesale-subheading">Why stock Cosy Cookie Co cookies?</h2>
                        <ul className="wholesale-list">
                            <li>
                            <strong>High margins:</strong> Retail at $6 per cookie with a wholesale price of just $3,
                            giving you a generous profit margin.
                            </li>
                            <li>
                            <strong>Unmatched quality:</strong> Made with care using premium, locally sourced
                            ingredients.
                            </li>
                            <li>
                            <strong>Freshness guaranteed:</strong> Baked locally and delivered to you at peak
                            freshness.
                            </li>
                            <li>
                            <strong>Versatile appeal:</strong> Perfect for cafes, restaurants, and general stores
                            looking to add an indulgent treat that sells itself.
                            </li>
                        </ul>
                        <p className="wholesale-paragraph">
                            By partnering with Cosy Cookie Co, you’re not just stocking cookies – you’re offering your
                            customers a product they’ll come back for, time and time again.
                        </p>
                        <Button variant="contained" sx={{backgroundColor:"#fee7d4", color:"#b66b58"}}>Register Today!</Button>
                </div>
            </section>
            </div>
        </div>

    );
    };

export default LoginPage;