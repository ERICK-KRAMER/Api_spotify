/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/PageMusicStyled";
import { Container, Content } from "../components/container";
import { Link } from "react-router-dom";

export function PageMusic() {
  const {  musicId, artistId } = useParams();

  const [data, setData] = useState('');
  const [ dataArtist, setDataArtist ] = useState('')

  useEffect(() => {
    async function loadData() {
      await axios.get(`http://localhost:3000/v1/tracks/${musicId}`)
        .then((response) => {setData(response.data.musicInfo);})
        .catch((error) => console.error(error));
      await axios.get(`http://localhost:3000/artist/${artistId}`)
        .then((response) => {setDataArtist(response.data.artist)})
        .catch((error) => {console.error(error)});
    }
    loadData();
  }, [musicId, artistId]);

  return (
    <section>
      <Container style={{display: "flex", justifyContent:"center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
        {data && dataArtist && (
          <Content>
            <h3>Music: {data.name}</h3>
            <h4>Artist: {data.artists.map(artist => artist.name).join(', ')}</h4>
            <h4>Genero: {dataArtist.genres.map(type => type).join(', ')}</h4>
            <Link to={dataArtist.external_urls.spotify} target="_blank"><img src={data.album.images[0].url} alt={data.name} /></Link>
          </Content>
        )}
        <Content>
          {data && data.preview_url !== null ? (
            <>
              <audio src={data.preview_url} controls></audio>
              <Button><a href={data && data.external_urls.spotify}>Escutar musica Completa</a></Button>
            </>
          ) : null}
        </Content>
      </Container>
    </section>
  );
}
