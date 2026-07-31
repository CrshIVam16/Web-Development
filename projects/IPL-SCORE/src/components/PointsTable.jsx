import React, { useEffect, useState } from "react";
import { XCircle, TickCircle } from 'reicon-react'

function PointsTable() {

    // Fixed data of IPL-2026
    let pointsTableData = {
        "pointsTable": [
            {
                "groupName": "Teams",
                "pointsTableInfo":
                    [
                        {
                            "teamId": 59,
                            "teamName": "RCB",
                            "matchesPlayed": 14,
                            "matchesWon": 9,
                            "matchesLost": 5,
                            "points": 18,
                            "nrr": "+0.783",
                            "teamFullName": "Royal Challengers Bengaluru",
                            "teamMatches": [
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1774706400000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 149618,
                                    "matchName": "1st Match",
                                    "winner": 59,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+2.907"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1775397600000",
                                    "result": "Won by 43 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 149721,
                                    "matchName": "11th Match",
                                    "winner": 59,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.406"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1775829600000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 149768,
                                    "matchName": "16th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-1.270"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1776002400000",
                                    "result": "Won by 18 runs",
                                    "opponentSName": "MI",
                                    "matchId": 149812,
                                    "matchName": "20th Match",
                                    "winner": 59,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.083"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1776261600000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 151774,
                                    "matchName": "23rd Match",
                                    "winner": 59,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.355"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1776506400000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 151807,
                                    "matchName": "26th Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.332"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1777039200000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 151889,
                                    "matchName": "34th Match",
                                    "winner": 59,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.070"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1777298400000",
                                    "result": "Won by 9 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 151935,
                                    "matchName": "39th Match",
                                    "winner": 59,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.818"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1777557600000",
                                    "result": "Lost by 4 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 151965,
                                    "matchName": "42nd Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.499"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1778162400000",
                                    "result": "Lost by 9 runs (19 Overs game due to rain, DLS Target 213)",
                                    "opponentSName": "LSG",
                                    "matchId": 152053,
                                    "matchName": "50th Match",
                                    "winner": 966,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "-0.186"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1778421600000",
                                    "result": "Won by 2 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 152097,
                                    "matchName": "54th Match",
                                    "winner": 59,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.131"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1778680800000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 152130,
                                    "matchName": "57th Match",
                                    "winner": 59,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.050"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1779012000000",
                                    "result": "Won by 23 runs",
                                    "opponentSName": "PBKS",
                                    "matchId": 152174,
                                    "matchName": "61st Match",
                                    "winner": 59,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.012"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1779458400000",
                                    "result": "Lost by 55 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 152240,
                                    "matchName": "67th Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.282"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1779804000000",
                                    "result": "Won by 92 runs",
                                    "opponentSName": "GT",
                                    "matchId": 155376,
                                    "matchName": "Qualifier 1",
                                    "winner": 59,
                                    "opponentId": 971,
                                    "opponentImageId": 860068
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1780236000000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 155409,
                                    "matchName": "Final",
                                    "winner": 59,
                                    "opponentId": 971,
                                    "opponentImageId": 860068
                                }
                            ],
                            "form": [
                                "W",
                                "W",
                                "L",
                                "W",
                                "W"
                            ],
                            "teamImageId": 860056,
                            "teamQualifyStatus": "Q"
                        },
                        {
                            "teamId": 971,
                            "teamName": "GT",
                            "matchesPlayed": 14,
                            "matchesWon": 9,
                            "matchesLost": 5,
                            "points": 18,
                            "nrr": "+0.695",
                            "teamFullName": "Gujarat Titans",
                            "teamMatches": [
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1774965600000",
                                    "result": "Lost by 3 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 149651,
                                    "matchName": "4th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.509"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1775311200000",
                                    "result": "Lost by 6 runs",
                                    "opponentSName": "RR",
                                    "matchId": 149699,
                                    "matchName": "9th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.085"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1775656800000",
                                    "result": "Won by 1 run",
                                    "opponentSName": "DC",
                                    "matchId": 149746,
                                    "matchName": "14th Match",
                                    "winner": 971,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.154"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1775988000000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 149801,
                                    "matchName": "19th Match",
                                    "winner": 971,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.241"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1776434400000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 151796,
                                    "matchName": "25th Match",
                                    "winner": 971,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.047"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1776693600000",
                                    "result": "Lost by 99 runs",
                                    "opponentSName": "MI",
                                    "matchId": 151845,
                                    "matchName": "30th Match",
                                    "winner": 62,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.839"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1777039200000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 151889,
                                    "matchName": "34th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.031"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1777197600000",
                                    "result": "Won by 8 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 151913,
                                    "matchName": "37th Match",
                                    "winner": 971,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.315"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1777557600000",
                                    "result": "Won by 4 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 151965,
                                    "matchName": "42nd Match",
                                    "winner": 971,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.283"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1777816800000",
                                    "result": "Won by 4 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 152009,
                                    "matchName": "46th Match",
                                    "winner": 971,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.045"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1778335200000",
                                    "result": "Won by 77 runs",
                                    "opponentSName": "RR",
                                    "matchId": 152075,
                                    "matchName": "52nd Match",
                                    "winner": 971,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.375"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1778594400000",
                                    "result": "Won by 82 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 152119,
                                    "matchName": "56th Match",
                                    "winner": 971,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+0.323"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1778940000000",
                                    "result": "Lost by 29 runs",
                                    "opponentSName": "KKR",
                                    "matchId": 152163,
                                    "matchName": "60th Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.151"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1779372000000",
                                    "result": "Won by 89 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 152229,
                                    "matchName": "66th Match",
                                    "winner": 971,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.295"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1779804000000",
                                    "result": "Lost by 92 runs",
                                    "opponentSName": "RCB",
                                    "matchId": 155376,
                                    "matchName": "Qualifier 1",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1780063200000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 155398,
                                    "matchName": "Qualifier 2",
                                    "winner": 971,
                                    "opponentId": 64,
                                    "opponentImageId": 860055
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1780236000000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 155409,
                                    "matchName": "Final",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056
                                }
                            ],
                            "form": [
                                "L",
                                "W",
                                "L",
                                "W",
                                "L"
                            ],
                            "teamImageId": 860068,
                            "teamQualifyStatus": "Q"
                        },
                        {
                            "teamId": 255,
                            "teamName": "SRH",
                            "matchesPlayed": 14,
                            "matchesWon": 9,
                            "matchesLost": 5,
                            "points": 18,
                            "nrr": "+0.524",
                            "teamFullName": "Sunrisers Hyderabad",
                            "teamMatches": [
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1774706400000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 149618,
                                    "matchName": "1st Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-2.907"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1775138400000",
                                    "result": "Won by 65 runs",
                                    "opponentSName": "KKR",
                                    "matchId": 149673,
                                    "matchName": "6th Match",
                                    "winner": 255,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+3.376"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1775383200000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 149710,
                                    "matchName": "10th Match",
                                    "winner": 966,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "-0.194"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1775901600000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 149779,
                                    "matchName": "17th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.299"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1776088800000",
                                    "result": "Won by 57 runs",
                                    "opponentSName": "RR",
                                    "matchId": 151752,
                                    "matchName": "21st Match",
                                    "winner": 255,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.600"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1776520800000",
                                    "result": "Won by 10 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 151818,
                                    "matchName": "27th Match",
                                    "winner": 255,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.010"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1776780000000",
                                    "result": "Won by 47 runs",
                                    "opponentSName": "DC",
                                    "matchId": 151856,
                                    "matchName": "31st Match",
                                    "winner": 255,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.254"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1777125600000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 151902,
                                    "matchName": "36th Match",
                                    "winner": 255,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.005"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1777471200000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 151954,
                                    "matchName": "41st Match",
                                    "winner": 255,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.017"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1777802400000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 151998,
                                    "matchName": "45th Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.188"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1778076000000",
                                    "result": "Won by 33 runs",
                                    "opponentSName": "PBKS",
                                    "matchId": 152042,
                                    "matchName": "49th Match",
                                    "winner": 255,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.093"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1778594400000",
                                    "result": "Lost by 82 runs",
                                    "opponentSName": "GT",
                                    "matchId": 152119,
                                    "matchName": "56th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.406"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1779112800000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 152196,
                                    "matchName": "63rd Match",
                                    "winner": 255,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.019"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1779458400000",
                                    "result": "Won by 55 runs",
                                    "opponentSName": "RCB",
                                    "matchId": 152240,
                                    "matchName": "67th Match",
                                    "winner": 255,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.174"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1779890400000",
                                    "result": "Lost by 47 runs",
                                    "opponentSName": "RR",
                                    "matchId": 155387,
                                    "matchName": "Eliminator",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055
                                }
                            ],
                            "form": [
                                "W",
                                "L",
                                "W",
                                "W",
                                "L"
                            ],
                            "teamImageId": 860066,
                            "teamQualifyStatus": "Q"
                        },
                        {
                            "teamId": 64,
                            "teamName": "RR",
                            "matchesPlayed": 14,
                            "matchesWon": 8,
                            "matchesLost": 6,
                            "points": 16,
                            "nrr": "+0.189",
                            "teamFullName": "Rajasthan Royals",
                            "teamMatches": [
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1774879200000",
                                    "result": "Won by 8 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 149640,
                                    "matchName": "3rd Match",
                                    "winner": 64,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+4.171"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1775311200000",
                                    "result": "Won by 6 runs",
                                    "opponentSName": "GT",
                                    "matchId": 149699,
                                    "matchName": "9th Match",
                                    "winner": 64,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-1.938"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1775570400000",
                                    "result": "Won by 27 runs",
                                    "opponentSName": "MI",
                                    "matchId": 149743,
                                    "matchName": "13th Match",
                                    "winner": 64,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.170"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1775829600000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 149768,
                                    "matchName": "16th Match",
                                    "winner": 64,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.348"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1776088800000",
                                    "result": "Lost by 57 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 151752,
                                    "matchName": "21st Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-1.166"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1776592800000",
                                    "result": "Lost by 4 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 151829,
                                    "matchName": "28th Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.290"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1776866400000",
                                    "result": "Won by 40 runs",
                                    "opponentSName": "LSG",
                                    "matchId": 151867,
                                    "matchName": "32nd Match",
                                    "winner": 64,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.191"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1777125600000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 151902,
                                    "matchName": "36th Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.188"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1777384800000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 151943,
                                    "matchName": "40th Match",
                                    "winner": 64,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.015"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1777644000000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 151976,
                                    "matchName": "43rd Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.107"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1778335200000",
                                    "result": "Lost by 77 runs",
                                    "opponentSName": "GT",
                                    "matchId": 152075,
                                    "matchName": "52nd Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.428"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1779026400000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 152185,
                                    "matchName": "62nd Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.055"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1779199200000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 152207,
                                    "matchName": "64th Match",
                                    "winner": 64,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.056"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1779616800000",
                                    "result": "Won by 30 runs",
                                    "opponentSName": "MI",
                                    "matchId": 152252,
                                    "matchName": "69th Match",
                                    "winner": 64,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.106"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1779890400000",
                                    "result": "Won by 47 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 155387,
                                    "matchName": "Eliminator",
                                    "winner": 64,
                                    "opponentId": 255,
                                    "opponentImageId": 860066
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1780063200000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 155398,
                                    "matchName": "Qualifier 2",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068
                                }
                            ],
                            "form": [
                                "L",
                                "W",
                                "W",
                                "W",
                                "L"
                            ],
                            "teamImageId": 860055,
                            "teamQualifyStatus": "Q"
                        },
                        {
                            "teamId": 65,
                            "teamName": "PBKS",
                            "matchesPlayed": 14,
                            "matchesWon": 7,
                            "matchesLost": 6,
                            "noRes": 1,
                            "points": 15,
                            "nrr": "+0.309",
                            "teamFullName": "Punjab Kings",
                            "teamMatches": [
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1774965600000",
                                    "result": "Won by 3 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 149651,
                                    "matchName": "4th Match",
                                    "winner": 65,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "+0.509"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1775224800000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 149684,
                                    "matchName": "7th Match",
                                    "winner": 65,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.128"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1775484000000",
                                    "result": "No result (due to rain)",
                                    "opponentSName": "KKR",
                                    "matchId": 149732,
                                    "matchName": "12th Match",
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "0.000"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1775901600000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 149779,
                                    "matchName": "17th Match",
                                    "winner": 65,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+0.083"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1776348000000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 151785,
                                    "matchName": "24th Match",
                                    "winner": 65,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.347"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1776607200000",
                                    "result": "Won by 54 runs",
                                    "opponentSName": "LSG",
                                    "matchId": 151840,
                                    "matchName": "29th Match",
                                    "winner": 65,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.353"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1777111200000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 151891,
                                    "matchName": "35th Match",
                                    "winner": 65,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.087"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1777384800000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 151943,
                                    "matchName": "40th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.290"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1777816800000",
                                    "result": "Lost by 4 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 152009,
                                    "matchName": "46th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.188"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1778076000000",
                                    "result": "Lost by 33 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 152042,
                                    "matchName": "49th Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.284"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1778508000000",
                                    "result": "Lost by 3 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 152108,
                                    "matchName": "55th Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.143"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1778767200000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 152141,
                                    "matchName": "58th Match",
                                    "winner": 62,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.073"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1779012000000",
                                    "result": "Lost by 23 runs",
                                    "opponentSName": "RCB",
                                    "matchId": 152174,
                                    "matchName": "61st Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.128"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1779544800000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 152241,
                                    "matchName": "68th Match",
                                    "winner": 65,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.082"
                                }
                            ],
                            "form": [
                                "L",
                                "L",
                                "L",
                                "L",
                                "W"
                            ],
                            "teamImageId": 860084,
                            "teamQualifyStatus": "E"
                        },
                        {
                            "teamId": 61,
                            "teamName": "DC",
                            "matchesPlayed": 14,
                            "matchesWon": 7,
                            "matchesLost": 7,
                            "points": 14,
                            "nrr": "-0.651",
                            "teamFullName": "Delhi Capitals",
                            "teamMatches": [
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1775052000000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 149662,
                                    "matchName": "5th Match",
                                    "winner": 61,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+1.397"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1775296800000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 149695,
                                    "matchName": "8th Match",
                                    "winner": 61,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.227"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1775656800000",
                                    "result": "Lost by 1 run",
                                    "opponentSName": "GT",
                                    "matchId": 149746,
                                    "matchName": "14th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.359"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1775916000000",
                                    "result": "Lost by 23 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 149790,
                                    "matchName": "18th Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.489"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1776506400000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 151807,
                                    "matchName": "26th Match",
                                    "winner": 61,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.012"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1776780000000",
                                    "result": "Lost by 47 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 151856,
                                    "matchName": "31st Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.440"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1777111200000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 151891,
                                    "matchName": "35th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.054"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1777298400000",
                                    "result": "Lost by 9 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 151935,
                                    "matchName": "39th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.876"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1777644000000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 151976,
                                    "matchName": "43rd Match",
                                    "winner": 61,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.165"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1777989600000",
                                    "result": "Lost by 8 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 152031,
                                    "matchName": "48th Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.054"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1778248800000",
                                    "result": "Lost by 8 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 152064,
                                    "matchName": "51st Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.205"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1778508000000",
                                    "result": "Won by 3 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 152108,
                                    "matchName": "55th Match",
                                    "winner": 61,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.161"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1779026400000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 152185,
                                    "matchName": "62nd Match",
                                    "winner": 61,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.122"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1779631200000",
                                    "result": "Won by 40 runs",
                                    "opponentSName": "KKR",
                                    "matchId": 152263,
                                    "matchName": "70th Match",
                                    "winner": 61,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.220"
                                }
                            ],
                            "form": [
                                "L",
                                "L",
                                "W",
                                "W",
                                "W"
                            ],
                            "teamImageId": 860040,
                            "teamQualifyStatus": "E"
                        },
                        {
                            "teamId": 63,
                            "teamName": "KKR",
                            "matchesPlayed": 14,
                            "matchesWon": 6,
                            "matchesLost": 7,
                            "noRes": 1,
                            "points": 13,
                            "nrr": "-0.147",
                            "teamFullName": "Kolkata Knight Riders",
                            "teamMatches": [
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1774792800000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 149629,
                                    "matchName": "2nd Match",
                                    "winner": 62,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "-0.687"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1775138400000",
                                    "result": "Lost by 65 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 149673,
                                    "matchName": "6th Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-1.277"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1775484000000",
                                    "result": "No result (due to rain)",
                                    "opponentSName": "PBKS",
                                    "matchId": 149732,
                                    "matchName": "12th Match",
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "0.000"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1775743200000",
                                    "result": "Lost by 3 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 149757,
                                    "matchName": "15th Match",
                                    "winner": 966,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.649"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1776175200000",
                                    "result": "Lost by 32 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 151763,
                                    "matchName": "22nd Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.068"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1776434400000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 151796,
                                    "matchName": "25th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "+0.234"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1776592800000",
                                    "result": "Won by 4 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 151829,
                                    "matchName": "28th Match",
                                    "winner": 63,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "+0.270"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1777212000000",
                                    "result": "Match tied (KKR won the Super Over)",
                                    "opponentSName": "LSG",
                                    "matchId": 151924,
                                    "matchName": "38th Match",
                                    "winner": 63,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.128"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1777802400000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 151998,
                                    "matchName": "45th Match",
                                    "winner": 63,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+0.212"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1778248800000",
                                    "result": "Won by 8 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 152064,
                                    "matchName": "51st Match",
                                    "winner": 63,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.370"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1778680800000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 152130,
                                    "matchName": "57th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.029"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1778940000000",
                                    "result": "Won by 29 runs",
                                    "opponentSName": "GT",
                                    "matchId": 152163,
                                    "matchName": "60th Match",
                                    "winner": 63,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "+0.160"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1779285600000",
                                    "result": "Won by 4 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 152218,
                                    "matchName": "65th Match",
                                    "winner": 63,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.049"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1779631200000",
                                    "result": "Lost by 40 runs",
                                    "opponentSName": "DC",
                                    "matchId": 152263,
                                    "matchName": "70th Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.158"
                                }
                            ],
                            "form": [
                                "W",
                                "L",
                                "W",
                                "W",
                                "L"
                            ],
                            "teamImageId": 860046,
                            "teamQualifyStatus": "E"
                        },
                        {
                            "teamId": 58,
                            "teamName": "CSK",
                            "matchesPlayed": 14,
                            "matchesWon": 6,
                            "matchesLost": 8,
                            "points": 12,
                            "nrr": "-0.345",
                            "teamFullName": "Chennai Super Kings",
                            "teamMatches": [
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1774879200000",
                                    "result": "Lost by 8 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 149640,
                                    "matchName": "3rd Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-4.171"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1775224800000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 149684,
                                    "matchName": "7th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+1.609"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1775397600000",
                                    "result": "Lost by 43 runs",
                                    "opponentSName": "RCB",
                                    "matchId": 149721,
                                    "matchName": "11th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.045"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1775916000000",
                                    "result": "Won by 23 runs",
                                    "opponentSName": "DC",
                                    "matchId": 149790,
                                    "matchName": "18th Match",
                                    "winner": 58,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.985"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1776175200000",
                                    "result": "Won by 32 runs",
                                    "opponentSName": "KKR",
                                    "matchId": 151763,
                                    "matchName": "22nd Match",
                                    "winner": 58,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.686"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1776520800000",
                                    "result": "Lost by 10 runs",
                                    "opponentSName": "SRH",
                                    "matchId": 151818,
                                    "matchName": "27th Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+0.066"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1776952800000",
                                    "result": "Won by 103 runs",
                                    "opponentSName": "MI",
                                    "matchId": 151878,
                                    "matchName": "33rd Match",
                                    "winner": 58,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.898"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1777197600000",
                                    "result": "Lost by 8 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 151913,
                                    "matchName": "37th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.239"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1777730400000",
                                    "result": "Won by 8 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 151987,
                                    "matchName": "44th Match",
                                    "winner": 58,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.126"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1777989600000",
                                    "result": "Won by 8 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 152031,
                                    "matchName": "48th Match",
                                    "winner": 58,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "+0.146"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1778407200000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 152086,
                                    "matchName": "53rd Match",
                                    "winner": 58,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.034"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1778853600000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 152152,
                                    "matchName": "59th Match",
                                    "winner": 966,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "-0.158"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1779112800000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 152196,
                                    "matchName": "63rd Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.043"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1779372000000",
                                    "result": "Lost by 89 runs",
                                    "opponentSName": "GT",
                                    "matchId": 152229,
                                    "matchName": "66th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.329"
                                }
                            ],
                            "form": [
                                "W",
                                "W",
                                "L",
                                "L",
                                "L"
                            ],
                            "teamImageId": 860038,
                            "teamQualifyStatus": "E"
                        },
                        {
                            "teamId": 62,
                            "teamName": "MI",
                            "matchesPlayed": 14,
                            "matchesWon": 4,
                            "matchesLost": 10,
                            "points": 8,
                            "nrr": "-0.584",
                            "teamFullName": "Mumbai Indians",
                            "teamMatches": [
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1774792800000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 149629,
                                    "matchName": "2nd Match",
                                    "winner": 62,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.687"
                                },
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1775296800000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 149695,
                                    "matchName": "8th Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-0.893"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1775570400000",
                                    "result": "Lost by 27 runs",
                                    "opponentSName": "RR",
                                    "matchId": 149743,
                                    "matchName": "13th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.509"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1776002400000",
                                    "result": "Lost by 18 runs",
                                    "opponentSName": "RCB",
                                    "matchId": 149812,
                                    "matchName": "20th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.057"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1776348000000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 151785,
                                    "matchName": "24th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.304"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1776693600000",
                                    "result": "Won by 99 runs",
                                    "opponentSName": "GT",
                                    "matchId": 151845,
                                    "matchName": "30th Match",
                                    "winner": 62,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "+1.143"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1776952800000",
                                    "result": "Lost by 103 runs",
                                    "opponentSName": "CSK",
                                    "matchId": 151878,
                                    "matchName": "33rd Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.803"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1777471200000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 151954,
                                    "matchName": "41st Match",
                                    "winner": 255,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "-0.048"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1777730400000",
                                    "result": "Lost by 8 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 151987,
                                    "matchName": "44th Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "-0.019"
                                },
                                {
                                    "opponent": "Lucknow Super Giants",
                                    "startdt": "1777903200000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "LSG",
                                    "matchId": 152020,
                                    "matchName": "47th Match",
                                    "winner": 62,
                                    "opponentId": 966,
                                    "opponentImageId": 882545,
                                    "nrrChanges": "+0.154"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1778421600000",
                                    "result": "Lost by 2 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 152097,
                                    "matchName": "54th Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.064"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1778767200000",
                                    "result": "Won by 6 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 152141,
                                    "matchName": "58th Match",
                                    "winner": 62,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "+0.081"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1779285600000",
                                    "result": "Lost by 4 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 152218,
                                    "matchName": "65th Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "-0.006"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1779616800000",
                                    "result": "Lost by 30 runs",
                                    "opponentSName": "RR",
                                    "matchId": 152252,
                                    "matchName": "69th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.074"
                                }
                            ],
                            "form": [
                                "W",
                                "L",
                                "W",
                                "L",
                                "L"
                            ],
                            "teamImageId": 860053,
                            "teamQualifyStatus": "E"
                        },
                        {
                            "teamId": 966,
                            "teamName": "LSG",
                            "matchesPlayed": 14,
                            "matchesWon": 4,
                            "matchesLost": 10,
                            "points": 8,
                            "nrr": "-0.740",
                            "teamFullName": "Lucknow Super Giants",
                            "teamMatches": [
                                {
                                    "opponent": "Delhi Capitals",
                                    "startdt": "1775052000000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "DC",
                                    "matchId": 149662,
                                    "matchName": "5th Match",
                                    "winner": 61,
                                    "opponentId": 61,
                                    "opponentImageId": 860040,
                                    "nrrChanges": "-1.397"
                                },
                                {
                                    "opponent": "Sunrisers Hyderabad",
                                    "startdt": "1775383200000",
                                    "result": "Won by 5 wkts",
                                    "opponentSName": "SRH",
                                    "matchId": 149710,
                                    "matchName": "10th Match",
                                    "winner": 966,
                                    "opponentId": 255,
                                    "opponentImageId": 860066,
                                    "nrrChanges": "+0.855"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1775743200000",
                                    "result": "Won by 3 wkts",
                                    "opponentSName": "KKR",
                                    "matchId": 149757,
                                    "matchName": "15th Match",
                                    "winner": 966,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.183"
                                },
                                {
                                    "opponent": "Gujarat Titans",
                                    "startdt": "1775988000000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "GT",
                                    "matchId": 149801,
                                    "matchName": "19th Match",
                                    "winner": 971,
                                    "opponentId": 971,
                                    "opponentImageId": 860068,
                                    "nrrChanges": "-0.068"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1776261600000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "RCB",
                                    "matchId": 151774,
                                    "matchName": "23rd Match",
                                    "winner": 59,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "-0.377"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1776607200000",
                                    "result": "Lost by 54 runs",
                                    "opponentSName": "PBKS",
                                    "matchId": 151840,
                                    "matchName": "29th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.369"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1776866400000",
                                    "result": "Lost by 40 runs",
                                    "opponentSName": "RR",
                                    "matchId": 151867,
                                    "matchName": "32nd Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.104"
                                },
                                {
                                    "opponent": "Kolkata Knight Riders",
                                    "startdt": "1777212000000",
                                    "result": "Match tied (KKR won the Super Over)",
                                    "opponentSName": "KKR",
                                    "matchId": 151924,
                                    "matchName": "38th Match",
                                    "winner": 63,
                                    "opponentId": 63,
                                    "opponentImageId": 860046,
                                    "nrrChanges": "+0.171"
                                },
                                {
                                    "opponent": "Mumbai Indians",
                                    "startdt": "1777903200000",
                                    "result": "Lost by 6 wkts",
                                    "opponentSName": "MI",
                                    "matchId": 152020,
                                    "matchName": "47th Match",
                                    "winner": 62,
                                    "opponentId": 62,
                                    "opponentImageId": 860053,
                                    "nrrChanges": "+0.030"
                                },
                                {
                                    "opponent": "Royal Challengers Bengaluru",
                                    "startdt": "1778162400000",
                                    "result": "Won by 9 runs (19 Overs game due to rain, DLS Target 213)",
                                    "opponentSName": "RCB",
                                    "matchId": 152053,
                                    "matchName": "50th Match",
                                    "winner": 966,
                                    "opponentId": 59,
                                    "opponentImageId": 860056,
                                    "nrrChanges": "+0.142"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1778407200000",
                                    "result": "Lost by 5 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 152086,
                                    "matchName": "53rd Match",
                                    "winner": 58,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.027"
                                },
                                {
                                    "opponent": "Chennai Super Kings",
                                    "startdt": "1778853600000",
                                    "result": "Won by 7 wkts",
                                    "opponentSName": "CSK",
                                    "matchId": 152152,
                                    "matchName": "59th Match",
                                    "winner": 966,
                                    "opponentId": 58,
                                    "opponentImageId": 860038,
                                    "nrrChanges": "+0.206"
                                },
                                {
                                    "opponent": "Rajasthan Royals",
                                    "startdt": "1779199200000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "RR",
                                    "matchId": 152207,
                                    "matchName": "64th Match",
                                    "winner": 64,
                                    "opponentId": 64,
                                    "opponentImageId": 860055,
                                    "nrrChanges": "-0.001"
                                },
                                {
                                    "opponent": "Punjab Kings",
                                    "startdt": "1779544800000",
                                    "result": "Lost by 7 wkts",
                                    "opponentSName": "PBKS",
                                    "matchId": 152241,
                                    "matchName": "68th Match",
                                    "winner": 65,
                                    "opponentId": 65,
                                    "opponentImageId": 860084,
                                    "nrrChanges": "-0.038"
                                }
                            ],
                            "form": [
                                "W",
                                "L",
                                "W",
                                "L",
                                "L"
                            ],
                            "teamImageId": 882545,
                            "teamQualifyStatus": "E"
                        }
                    ]
            }]
    }

    const [tableData, setTableData] = useState([]);

    async function fetchPointsTable() {
        const url =
            "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/9241/points-table";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    import.meta.env.VITE_API_KEY,
                "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setTableData(result.pointsTable[0].pointsTableInfo)
            console.log(result.pointsTable[0].pointsTableInfo);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // fetchPointsTable()
        setTableData(pointsTableData.pointsTable[0].pointsTableInfo)
    }, [])

    return (
        <div className="w-full p-3 max-sm:text-[13px]">

            <table className="w-full">
                <tr className="text-center w-full h-12.5">
                    <td className="text-left w-[20%] sm:w-[40%]">Team</td>
                    <td>W</td>
                    <td>P</td>
                    <td>L</td>
                    <td>NRR</td>
                    <td>Pts</td>
                    <td>Last 5</td>
                </tr>

                {tableData.length <= 0 ? <h1>Loading...</h1> : tableData.map(
                    (
                        {
                            form,
                            matchesLost,
                            matchesPlayed,
                            matchesWon,
                            teamName,
                            nrr,
                            points,
                            teamImageId
                        },
                        i
                    ) => (
                        <tr className="text-center w-full border-t border-gray-100/30 h-12.5">
                            <div className="flex gap-5 max-sm:gap-2 mt-2">
                                <td className="w-5">{i + 1}</td>
                                {/* <img
                                    className="w-5 mb-1 border object-cover"
                                    src={`https://documents.iplt20.com/bcci/articles/1722448657_IPL%20_%20Thumbnail.PNG`}
                                    alt="Img"
                                /> */}
                                <td>{teamName}</td>
                            </div>
                            <td className="max-sm:border w-15">{matchesWon}</td>
                            <td className="max-sm:border w-15">{matchesPlayed}</td>
                            <td className="max-sm:border w-15">{matchesLost}</td>
                            <td className="max-sm:border w-15">{nrr}</td>
                            <td className="max-sm:border w-15">{points}</td>

                            <td className="flex justify-center">
                                {form
                                    .reverse()
                                    .map((data) =>
                                        data === "W" ? (
                                            <TickCircle className="text-green-500 max-sm:w-5" />) : (<XCircle className="text-red-500 max-sm:w-5" />)
                                    )}
                            </td>

                        </tr>
                    )
                )}
            </table>
        </div>
    );
}

export default PointsTable;


