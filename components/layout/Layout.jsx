import React from 'react'; // non-mandatory
import './Layout.scss';
import { Header } from '../header/Header';
import { Main } from '../main/Main';
import { Footer } from '../footer/Footer';

export function Layout() {
    return (
        <div className="layout">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}