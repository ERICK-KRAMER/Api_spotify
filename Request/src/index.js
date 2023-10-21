/* eslint-disable no-undef */
const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 3000;

const client_id = "YOUR CLIENT_IS";
const client_secret = 'YOUR CLIENT_SECRET';

app.use(cors())
app.get('/musica/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Autenticação para obter o token de acesso
    const authResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      );
      const accessToken = authResponse.data.access_token;
      
      // Pesquisar uma faixa de música usando o nome fornecido
      const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: name,
          type: 'track',
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      
      res.json({ searchResult: searchResponse.data });
    } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/v1/tracks/:id' , async (req, res) => {
  const { id } = req.params;
  try {
    // Autenticação para obter o token de acesso
    const authResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      );
      const accessToken = authResponse.data.access_token;
      
      // Buscar informações sobre a faixa específica usando o ID
      const urlMusic = `https://api.spotify.com/v1/tracks/${id}`;
      const musicResponse = await axios.get(urlMusic, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
      },
    });
    
    res.json({ musicInfo: musicResponse.data  })
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: 'Erro inteiro no servidor' })
  }
})

app.get('/artist/:artistId', async ( req, res ) => {
  const { artistId } = req.params;
  const urlArtist = `https://api.spotify.com/v1/artists/${artistId}`
  try {
    // Autenticação para obter o token de acesso
    const authResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      );
      const accessToken = authResponse.data.access_token;

     const artistResponse = await axios.get(urlArtist, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
      res.json({ artist: artistResponse.data })
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "erro inteiro no servidor" })
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




