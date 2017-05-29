import React from 'react'

import Link from 'next/link'
import { Head, Nav } from '../components'

export default () => (
  <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Welcome to Next!</h1>
        <p className="description">To get started, edit <code>pages/index.js</code> and save to reload.</p>

        <div className="row">
          <Link prefetch href="/b">
            <a className="card">
              <h3>B &rarr;</h3>
              <p>Jucvoh tuibci ta ub vuz obohazdo kej zuvo abji pilpejaj kiati kobomih roju vuljotum fic nupku cuhpaw.</p>
            </a>
          </Link>
          <Link prefetch href="/a">
            <a className="card">
              <h3>A &rarr;</h3>
              <p>
                Fur meidi mo targip uv uhbeto dudja doebi mo naprelel gutemuru mo ifsupbeg.
              </p>
            </a>
          </Link>
          <Link href="https://github.com/segmentio/create-next-app">
            <a className="card">
              <h3>Create Next App &rarr;</h3>
              <p>Was this tool helpful? Let us know how we can improve it</p>
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title, .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9B9B9B;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
)
