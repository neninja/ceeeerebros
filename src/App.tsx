import './App.css';
import Button from '@mui/material/Button';
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import {
  FaceRetouchingOff,
  LunchDining,
  Fastfood,
  DinnerDining,
  Icecream,
  Restaurant,
  LocalPizza,
  Face5,
} from '@mui/icons-material';
import { Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import ana from './audios/ana.mp3';
import cris from './audios/cris.mp3';
import gab from './audios/gab.mp3';
import giu from './audios/giu.mp3';
import joao from './audios/joao.mp3';
import leo from './audios/leo.mp3';
import luizi from './audios/luizi.mp3';
import mariana from './audios/mariana.mp3';
import pedro from './audios/pedro.mp3';
import rei from './audios/rei.mp3';
import taiwo from './audios/taiwo.mp3';
import paulo from './audios/paulo.mp3';
import { Container } from '@mui/system';

const LOCALSTORAGE_PREFIX = 'ceeeerebros:';
const LOCALSTORAGE_ZOMBIES = LOCALSTORAGE_PREFIX + 'zombies';

type Zombie = {
  id: number
  name: string
  brains: number
}

function App() {
  const [ceeeeerebroAudio, setCeeeeerebroAudio] = useState(() => randomCeeeeerebroAudio());
  const [play, { stop }] = useSound(ceeeeerebroAudio);
  const [zombies, setZombies] = useState<Zombie[]>(() => {
    const initialValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_ZOMBIES) || "");
    return initialValue || [];
  });

  const [brainIcon, setBrainIcon] = useState(() => randomBrainIcon());

  const [currentZombie, setCurrentZombie] = useState<Zombie | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_ZOMBIES, JSON.stringify(zombies));
  }, [zombies]);

  useEffect(() => {
    if (!currentZombie) {
      return;
    }

    if (currentZombie?.brains === 0) {
      setBrainIcon(<Face5 sx={{ml: 1}} />)
    } else {
      setBrainIcon(randomBrainIcon())
    }
  }, [currentZombie]);

  function randomBrainIcon() {
    return [
      <LunchDining sx={{ml: 1}} />,
      <Fastfood sx={{ml: 1}} />,
      <DinnerDining sx={{ml: 1}} />,
      <Icecream sx={{ml: 1}} />,
      <Restaurant sx={{ml: 1}} />,
      <LocalPizza sx={{ml: 1}} />,
    ].sort(() => Math.random() - 0.5)[0]
  }

  function randomCeeeeerebroAudio(): string {
    return [
      ana, cris, gab, giu, joao, leo, luizi, mariana, pedro, rei, taiwo, paulo
    ].sort(() => Math.random() - 0.5)[0]
  }

  function handleStoreZombies() {
    const zombieName = document.querySelector<HTMLInputElement>('.zombies input')?.value;
    if (!zombieName) {
      return;
    }

    const existentZombie = zombies.find(zombie => zombie.name === zombieName);
    if (existentZombie) {
      alert('Zombie already exists');
      return;
    }

    const lastId = zombies.length > 0 ? zombies[zombies.length - 1].id : 0;
    const newZombies = [...zombies, {
      id: lastId + 1,
      name: zombieName,
      brains: 0
    }];

    setZombies(newZombies);

    document.querySelector<HTMLInputElement>('.zombies input')!.value = '';
  }

  function handleDeleteZombie(id: number) {
    const newZombies = zombies.filter(zombie => zombie.id !== id);
    setZombies(newZombies);
  }

  function handleSelectZombie(id: number) {
    const zombie = zombies.find(zombie => zombie.id === id);
    setCurrentZombie(zombie ?? null);
  }

  function handleAddBrain() {
    if (!currentZombie) {
      return;
    }

    const newZombies = [...zombies];
    const zombieIndex = newZombies.findIndex(zombie => zombie.id === currentZombie.id);
    newZombies[zombieIndex].brains += 1;
    setZombies(newZombies);
    stop();
    play();

    setBrainIcon(randomBrainIcon())
    setCeeeeerebroAudio(randomCeeeeerebroAudio())
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: "100%",
        position: 'relative',
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >

      <Container maxWidth="sm">
        <div className="zombies">
          <form onSubmit={function(e) { e.preventDefault(); handleStoreZombies() }}>
            <TextField
              required
              fullWidth
              label="Nome do zumbi"
              placeholder="neeeeni"
            />
          </form>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Zumbi</TableCell>
                <TableCell>Cérebros</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zombies.map((zombie) => (
                <TableRow key={zombie.id} sx={{background: zombie.id === currentZombie?.id ? "#f44336" : ""}}>
                  <TableCell onClick={() => handleSelectZombie(zombie.id)}>{zombie.name}</TableCell>
                  <TableCell>{zombie.brains}</TableCell>
                  <TableCell><Button color="warning" onClick={() => handleDeleteZombie(zombie.id)}>
                    <FaceRetouchingOff />
                  </Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab variant="extended" disabled={!currentZombie} size="large" style={{ position: 'fixed', right: '1rem', bottom: '1rem' }} color="error" aria-label="add" onClick={handleAddBrain}>
          {currentZombie?.name}{brainIcon}
        </Fab>
      </Container>
    </Box>
  );
}

export default App;
