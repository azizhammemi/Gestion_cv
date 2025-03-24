import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';



const barChartsParams = {
  xAxis: [
    {
      data: ['Compétence', 'Expérience', 'Formation', 'Loisirs', 'Visage', 'Informations'],
      scaleType: 'band',
      slotProps: {
        ticks: {
          textStyle: {
            transform: 'rotate(-90deg)', // Rotation à -90 degrés pour afficher les titres verticalement
            textAlign: 'right', // Alignement du texte à droite
          },
        },
      },
    },
  ],
  series: [
    {
      data: [3, 2.5, 1.5, 1, 2, 1.5],
      label: 'Coefficients CV',
    },
  ],
  margin: { top: 10, right: 10 },
  height: 200,
  width:550,
  slotProps: {
    legend: {
      show: true,
      position: 'bottom', // Position de la légende en haut
    },
  },
};



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ModaleMissing(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);



  console.log(props.missingEurope.length)

  return (
    <div>
      <section id="norme">
        <aside>
          <Card sx={{ maxWidth: 170, maxHeight: 350 }}>
            <CardContent>
              <center>
                <img
                  src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1711728624/europe_kh0r5j.png"
                  alt="Europe flag"
                  className="pays"
                />
              </center>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                  <Gauge
                    width={100}
                    height={100}
                    value={Number(props.scoreEurope)}
                    startAngle={-90}
                    endAngle={90}
                  />
                </Stack>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleOpen} variant="contained" color="primary">
                How to improve
              </Button>
            </CardActions>
          </Card>
        </aside>

        <aside>
          <Card sx={{ maxWidth: 170, maxHeight: 350 }}>
            <CardContent>
              <center>
                <img
                  src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1711728624/canada_u7reyj.png"
                  alt="Europe flag"
                  className="pays"
                />
              </center>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                  <Gauge
                    width={100}
                    height={100}
                    value={Number(props.scoreCanda)}
                    startAngle={-90}
                    endAngle={90}
                  />
                </Stack>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleOpen1} variant="contained" color="primary">
                How to improve
              </Button>
            </CardActions>
          </Card>
        </aside>

        <Stack direction="column" sx={{ width: '100%', maxWidth: 400 }}>
          <BarChart {...barChartsParams} tooltip={{ trigger: 'axis' }} />
          
       </Stack>

      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1711805899/european_kivhkq.png" width={30} height={30}></img>pour améliorer ton score selon les normes européennes
            <ul>
              {/* Utilisation d'une boucle for pour parcourir le tableau */}
              {(() => {
                const listItems = [];
                for (let i = 0; i < props.missingEurope.length; i++) {
                  listItems.push(<li key={i}>{props.missingEurope[i]}</li>);
                }
                return listItems;
              })()}
            </ul>
          </Typography>
        </Box>
      </Modal>


      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1711805901/canada_ezd3cf.png" width={30} height={30}></img>pour améliorer ton score selon les normes canadiéin
            <ul>
              {/* Utilisation d'une boucle for pour parcourir le tableau */}
              {(() => {
                const listItems1 = [];
                for (let i = 0; i < props.missingCanda.length; i++) {
                  listItems1.push(<li key={i}>{props.missingCanda[i]}</li>);
                }
                return listItems1;
              })()}
            </ul>
          </Typography>
        </Box>
      </Modal>






    </div>
  );
}