import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import './Home.css'

function Home() {
    return(
        <div className="containerHome">
            <Header />
            <div className="Home">
                <h1>MARKETMATCH</h1>
                <h2>COMPRA INTELIGENTE</h2>
                <div className="search-container">
                    <input type="text" placeholder="O que está procurando?" className="search-input"/>
                    <button className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;