import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.casasbahia.com.br/';


export default function Home() {
  const [inputValue, setInputValue] = React.useState('')
  const [userFollowers, setUserFollowers] = React.useState({})

  axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tabelaStatus = $('a#TeleVendas');
    const tabelaJogador = [];
    tabelaStatus.each(function(){
        const nomeJogador = $(this).find('.jogador-nome').text();
        const posicaoJogador = $(this).find('.jogador-posicao').text();
        const numeroGols = $(this).find('.jogador-gols').text();
        const timeJogador = $(this).find('.jogador-escudo > img').attr('alt');
        tabelaJogador.push({
            nomeJogador,
            posicaoJogador,
            numeroGols,
            timeJogador
        });
    });
    console.log(tabelaStatus);
    
}).catch(console.error);
  return (
    <div className={styles.container}>
      <Head>
        <title>Minerando o primeiro produto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Minerando o primeiro produto</h1>
        <p>jogadores: </p>

      </main>
    </div>
  )
}