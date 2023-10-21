import styled from "styled-components";
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export const HeaderComponent = ({ name, getInfoMusic, setName }) => {
  
  HeaderComponent.propTypes = {
    name: PropTypes.string.isRequired,
    getInfoMusic: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
  };

  return (
    <Header>
      <h1>Api_Spotify 1.1.0</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          placeholder="Search..."
        />
        <button onClick={getInfoMusic} >
          <FaSearch />
        </button>
      </div>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between; 
  padding: 1rem;
  flex-wrap: wrap;

  @media screen and (max-width: 605px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  div {
    position: relative;
  }

  div input[type="text"] {
    position: relative;
    height: 40px;
    width: 100%; 
    max-width: 350px; 
    border: lightgray 1px solid;
    border-radius: 5px;
    outline: none;
    padding: 1rem;
    font-size: 20px;
    font-weight: 600;
  }

  div button {
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease; 
  }

  div button:hover {
    background-color: #f0f0f0; 
  }
`;
