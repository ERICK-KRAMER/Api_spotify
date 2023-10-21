import axios from "axios";
import { useState } from "react";
import { HeaderComponent } from "../components/header";
import { Container, Content } from "../components/container";
import { Link } from "react-router-dom";

export function Home() {
  const [name, setName] = useState(''); 
  const [musics, setMusic] = useState([])

  const getInfoMusic = (evt) => {
    setName(evt.target.value)
    axios.get(`http://localhost:3000/musica/${name}`)
      .then((response) => {setMusic(response.data.searchResult.tracks.items)})
      .catch((error) => {console.error("Erro na solicitação:",error);});
    }

  return (
    <div>
      <HeaderComponent
        getInfoMusic={getInfoMusic}
        setName={setName} 
        name={name}
      />  
        <Container>
          {musics.map((music) => (
            <Content key={music.id}>
              <Link
                to={{
                  pathname: `/track/${music.artists[0].id}/${music.id}`,
                  state: { searchResults: musics }
                }}
              >
                <img src={music.album.images[0].url} alt={music.name} />
              </Link>
              <span>{music.name}</span>
            </Content>
          ))}
        </Container>
    </div>
  );
}