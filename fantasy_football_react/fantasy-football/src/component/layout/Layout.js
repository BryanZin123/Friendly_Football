import React from "react";
import { useState } from "react";
import { Header } from "../header/Header";
import { SignUp } from "../sign-up/SignUp";
import { Route, Routes } from "react-router-dom";
import { AboutUs } from "../aboutus/AboutUs";
import { Home } from "../home/Home";
import { Footer } from './../footer/Footer';
import { Dashboard } from './../dashboard/Dashboard';
import { LeaderBoard } from './../leagueleaderboard/LeaderBoard';
import { PlayerDetails } from './../playerdetail/PlayerDetails';
import { Search } from './../search/Search';
import { Error } from './../error/Error';
import { Login } from "../login/Login";
import { DraftPage } from './../draft/DraftPage';
import { ThankYou } from "../thankYou/ThankYou";




export const Layout=(props)=>{

    const [isLoggedIn, setIsLoggedIn]=useState('');
    const [viewId, setViewId]=useState();


    const refresh =(loggedIn)=>{
        console.log("login is conneted to layout")
        setIsLoggedIn(loggedIn);
    }

    const playerId=(id)=>{
        console.log("draft is connected to layout");
        setViewId(id);
    }

    return (
        <>
        <Header display = {refresh}/>
        <Routes>
        <Route exact path="/draft" element={<DraftPage handlePlayerView={playerId}/>}/>
        <Route exact path="/sign-up" element={<SignUp/>}/>
        <Route exact path="/about-us" element={<AboutUs/>}/>
        <Route exact path="/thank-you" element={<ThankYou/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/leaderboard" element={<LeaderBoard/>}/>
        <Route exact path="/playerdetails/:id" element={<PlayerDetails viewPlayerId={viewId}/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route path="*"  element={<Error/>}/>
        <Route exact path="/login" element={<Login refresh={refresh}/>}/>
        </Routes>
        <Footer/>
        </>
    )
}