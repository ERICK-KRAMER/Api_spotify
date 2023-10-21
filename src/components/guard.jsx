import PropTypes from 'prop-types'
import { useState } from 'react';
import axios from 'axios';
import { Container, Content } from './container';
import { HeaderComponent } from './header';

const client_id = "c37f82bf4d5e45a19ab61cfffeb115d0";
const client_secret = 'f2b9c4392082445b8c873952f82026cc';


const SpotifyComponent = ({ onSearch, onPlay, musicResults: externalMusicResults, previewUrl, isPlaying }) => {

    SpotifyComponent.propTypes = {
        onSearch: PropTypes.func.isRequired,
        onPlay: PropTypes.func.isRequired,
        musicResults: PropTypes.array.isRequired,
        previewUrl: PropTypes.string.isRequired,
        isPlaying: PropTypes.bool.isRequired,
      }

    const [name, setName] = useState('');
    
    const SpotifyAuthenticator = async () => {
        try {
            const authResponse = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    );
    
    setName('')
    const accessToken = authResponse.data.access_token;
    
    const searchResponse = await axios.get(
        'https://api.spotify.com/v1/search',
        {
            params: {
                q: `${name}`,
                type: 'track',
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }
        );
        
        onSearch(searchResponse.data.tracks.items);
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleMusic = (previewUrl) => {
    onPlay(previewUrl);
};

return (
    <div>
      <HeaderComponent SpotifyAuthenticator={SpotifyAuthenticator} name={name} setName={setName} />
      <Container>
      {!externalMusicResults || externalMusicResults.length === 0 ? (
        console.log("erro")
        ) : (
        externalMusicResults.map((music) => (
            <Content key={music.id}>
               <img src={music.album.images[0].url} alt={music.name} onClick={() => handleMusic(music.preview_url)} />
               <span>{music.name}</span>
            </Content>
            ))
        )}
          {previewUrl && isPlaying ? (
            <audio key={previewUrl} autoPlay>
              <source src={previewUrl} type="audio/mp3" />
              <p>Seu navegador não suporta a tag de áudio.</p>
            </audio>
          ) : null}
      </Container>
    </div>
  );
};

export default SpotifyComponent;






import { useState } from 'react';
import SpotifyComponent from '../src/components/Resquest'
import '../src/style/global.css';

// const client_id = "c37f82bf4d5e45a19ab61cfffeb115d0";
// const client_secret = 'f2b9c4392082445b8c873952f82026cc';

export function App() {
  const [musicResults, setMusicResults] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = (results) => {
    setMusicResults(results);
  };

  const handlePlay = (url) => {
    setPreviewUrl(url);
    // console.log(musicResults)
    setIsPlaying(true);
  };

  return (
    <>
      <SpotifyComponent
        onSearch={handleSearch}
        onPlay={handlePlay}
        musicResults={musicResults}
        previewUrl={previewUrl}
        isPlaying={isPlaying}
      />
    </>
  );
}








import axios from "axios";
import { useState } from "react";

export function Home() {
  const [name, setName] = useState(''); 

  const buscarInformacoesDaMusica = () => {
    axios.get(`http://seuservidor:3000/musica/${name}`)
      .then((response) => {console.log(response.data);})
      .catch((error) => {console.error("Erro na solicitação:",error);});}

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(evt) => { setName(evt.target.value) }}
      />
      <button onClick={buscarInformacoesDaMusica}>Buscar Música</button>
    </div>
  );
}



import { Autenticator } from "../components/Request/Resquest";
import { HeaderComponent } from "../components/header";
import { Container } from "../components/container";
import { Content } from "../components/container";

import { useState, useEffect, useCallback } from "react"; // Importe useCallback
import axios from "axios";
import { Link } from "react-router-dom";

export function Home() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setToken(await Autenticator());
      const result = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: name,
          type: 'track',
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSearchResults(result.data.tracks.items);
    } catch (error) {
      console.error('Search Error:', error);
    }
  }, [token, name]);

  useEffect(() => {
    fetchData();
  }, [fetchData, name, token]);

  return (
    <>
      <HeaderComponent
        name={name}
        setName={setName}
        searchResults={searchResults}
        handleSearch={fetchData}
      />
      <Container>
        {searchResults.map((music) => (
          <Content key={music.id}>
            <Link
              to={{
                pathname: `/album/track/${music.id}`,
                state: { searchResults: searchResults }
              }}
            >
              <img src={music.album.images[0].url} alt={music.name} />
            </Link>
            <span>{music.name}</span>
          </Content>
        ))}
      </Container>
    </>
  );
}



import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Autenticator } from "../components/Request/Resquest";
import axios from "axios";
import { Container, Content } from "../components/container";

export function PageMusic() {
  const [token, setToken] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await Autenticator();
      setToken(result);
    } catch (error) {
      console.log("Error fetching token:", error);
    }
  }, []);

  const getMusic = useCallback(async () => {
    try {
      if (token) {
        const urlMusic = `https://api.spotify.com/v1/tracks/${id}`;
        const response = await axios.get(urlMusic, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } else {
        console.log("Token is not available.");
      }
    } catch (error) {
      console.error('Music Error:', error);
    }
  }, [token, id]);
  
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 100);
  }, [fetchData]);
  
  useEffect(() => {
    getMusic();
  }, [getMusic]);

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "1rem" }}>Api_Spotify 1.1.0</h1>
      <Container>
        {data && (
          <Content>
            <img src={data.album.images[0].url} alt={data.name} />
          </Content>
        )}
        <Content>
          {data && data.preview_url !== null ? (
            <>
              <h2>{data.name}</h2>
              <h4>Artist: {data.artists.map(artist => artist.name).join(', ')}</h4>
              <p>Album: {data.album.name}</p>
              <audio src={data.preview_url} controls></audio>
            </>
          ) : null}
          <button><a href={data && data.external_urls.spotify}>Escutar musica Completa</a></button>
        </Content>
      </Container>
    </div>
  );
}




